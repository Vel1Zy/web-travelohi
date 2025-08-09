package handler

import (
	"fmt"
	"math/rand"
	"net/http"
	"net/smtp"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
	model "traveloHI/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllUsers(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var users []model.User
		result := db.Find(&users)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}
		c.JSON(http.StatusOK, users)
	}
}

func RegisterUserHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var newUser model.User
		if err := c.BindJSON(&newUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// === Validate the new user data ===

		if len(newUser.FirstName) < 5 || len(newUser.LastName) < 5 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "First name and last name must be at least 5 characters long"})
			return
		}

		if !strings.HasSuffix(strings.ToLower(newUser.Email), "@gmail.com") {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email must end with @gmail.com"})
			return
		}

		existingUser := model.User{}
		if err := db.Where("email = ?", newUser.Email).First(&existingUser).Error; err == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Email already exists"})
			return
		}

		if !isValidName(newUser.FirstName) || !isValidName(newUser.LastName) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "First name and last name must contain only letters"})
			return
		}
		dob, err := time.Parse("2006-01-02", newUser.DateOfBirth)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date of birth format"})
			return
		}
		age := calculateAge(dob)
		if age < 13 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User must be at least 13 years old"})
			return
		}

		if newUser.Gender != "male" && newUser.Gender != "female" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Gender must be either 'male' or 'female'"})
			return
		}

		if !isValidPassword(newUser.Password) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Password must be 8-30 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"})
		}

		validQuestions := map[string]bool{
			"What is your favorite childhood pet's name?":             true,
			"In which city were you born?":                            true,
			"What is the name of your favorite book or movie?":        true,
			"What is the name of the elementary school you attended?": true,
			"What is the model of your first car?":                    true,
		}
		if _, ok := validQuestions[newUser.PersonalSecurityQuestion]; !ok {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid personal question"})
			return
		}

		// === Add the user into the Database ===

		if err := model.CreateNewUser(db, &newUser); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create user"})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "User created successfully"})
	}

}

// =================== CREATE USER HANDLER UTILITIES ===================
func isValidName(name string) bool {
	regex := regexp.MustCompile("^[a-zA-Z\\s]+$")
	return regex.MatchString(name)
}

func isValidPassword(password string) bool {
	regex := regexp.MustCompile(`^[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>?\/[\]\\|]{8,30}$`)
	return regex.MatchString(password)
}

func calculateAge(dob time.Time) int {
	today := time.Now()
	age := today.Year() - dob.Year()
	if today.Month() < dob.Month() || (today.Month() == dob.Month() && today.Day() < dob.Day()) {
		age--
	}
	return age
}

func GetCurrentUserHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		cookie, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "JWT token not found"})
			return
		}

		userID := extractIdFromCookie(cookie, c)
		if userID == 999999999 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to extract user ID from token"})
		}

		var user model.User
		if err := db.Preload("PaymentMethod").First(&user, userID).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user from the database"})
			return
		}

		c.JSON(http.StatusOK, user)

	}
}
func GetUserByCookieID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenCookie, err := c.Request.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "JWT token not found in the cookie"})
			return
		}

		tokenValue := tokenCookie.Value

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "JWT secret is not set"})
			return
		}

		token, err := jwt.Parse(tokenValue, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecret), nil // Use the actual JWT secret key obtained from the environment variable
		})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse JWT token"})
			return
		}

		if !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
			return
		}

		// claims adalah isi dari payload token (yg di encode)
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract claims"})
			return
		}

		userID, ok := claims["sub"].(float64)
		if !ok {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract user ID"})
			return
		}

		fmt.Print(userID)

		// find user dri db berdasarkan userID
		var user model.User
		if err := db.First(&user, uint(userID)).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user data"})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}

func PatchUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		var user model.User
		if err := db.First(&user, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		var updatedUser model.User
		if err := c.ShouldBindJSON(&updatedUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data format"})
			return
		}

		user.FirstName = updatedUser.FirstName
		user.LastName = updatedUser.LastName
		user.DateOfBirth = updatedUser.DateOfBirth
		user.Gender = updatedUser.Gender
		user.PhoneNumber = updatedUser.PhoneNumber
		user.Address = updatedUser.Address
		user.NewsletterSubscription = updatedUser.NewsletterSubscription

		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}

		c.JSON(http.StatusOK, user)
	}
}

// === OTP HANDLING ===

func GenerateOTP(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email string `json:"email"`
		}
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		var user model.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Email does not exist"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}

		otp := rand.Intn(999999)
		if otp < 100000 {
			otp += 100000
		}
		otpString := strconv.Itoa(otp)

		user.OTP = fmt.Sprintf("%06d", otp)
		user.OTPCreatedAt = time.Now()

		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save OTP"})
			return
		}

		sendEmail(req.Email, otpString)

		c.JSON(http.StatusOK, gin.H{"message": "OTP Code has been sent to the Email, please check your mailbox"})
	}
}

func sendEmail(recipient, otp string) error {
	from := os.Getenv("EMAIL_SENDER_ADDRESS")
	password := os.Getenv("EMAIL_SENDER_PASSWORD")

	to := []string{recipient}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	message := []byte("Subject: Your OTP\n\nYour OTP is: " + otp + "\n\nThe OTP will be valid for 15 Minutes!!")

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
	if err != nil {
		return err
	}

	return nil
}

// Handle OTP validation
func ValidateOTP(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email string `json:"email"`
			OTP   string `json:"otp"`
		}
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		var user model.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Email does not exist"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}

		if user.OTP != req.OTP {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid OTP" + user.OTP + req.OTP})
			return
		}

		if time.Since(user.OTPCreatedAt).Minutes() > 15 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "OTP expired"})
			return
		}

		// Clear the OTP from the user account
		user.OTP = ""
		user.OTPCreatedAt = time.Time{}
		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to clear OTP"})
			return
		}

		//generate token
		expirationTime := time.Now().Add(12 * time.Hour) // expiration time 12 hours since the creation
		claims := &jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			Subject:   strconv.Itoa(int(user.ID)),
		}

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "JWT secret is not set"})
			return
		}

		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		signedToken, err := token.SignedString([]byte(jwtSecret))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate token"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "OTP validation successful", "token": signedToken})
	}
}

// === BAN USER ===
func SetUserBannedHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userIDStr := c.Param("id")
		userID, err := strconv.Atoi(userIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		var user model.User
		result := db.First(&user, userID)
		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		user.IsBanned = true

		result = db.Save(&user)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "User banned successfully", "user": user})
	}
}

// == SEND EMAIL TO SUBSCRIBED ACCOUNT ==

func SendEmailToSubscribedUsersHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var subscribedUsers []model.User
		if err := db.Where("newsletter_subscription = ?", true).Find(&subscribedUsers).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch subscribed users"})
			return
		}

		message := "Hello! This is a message for subscribed users."

		for _, user := range subscribedUsers {
			err := sendEmailSubscribed(user.Email, message)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email to user"})
				return
			}
		}

		c.JSON(http.StatusOK, gin.H{"message": "Emails sent to all subscribed users"})
	}
}

func sendEmailSubscribed(recipient, message string) error {
	from := os.Getenv("EMAIL_SENDER_ADDRESS")
	password := os.Getenv("EMAIL_SENDER_PASSWORD")

	to := []string{recipient}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	emailMessage := []byte("Subject: Newsletter\n\n" + message)

	auth := smtp.PlainAuth("", from, password, smtpHost)

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, emailMessage)
	if err != nil {
		return err
	}

	return nil
}
