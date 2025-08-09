// In your handlers package
package handler

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
	model "traveloHI/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func LoginHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var creds LoginCredentials
		if err := c.ShouldBindJSON(&creds); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		if !strings.HasSuffix(creds.Email, "@gmail.com") {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email format"})
			return
		}

		var user model.User
		result := db.Where("email = ?", creds.Email).First(&user)
		if result.Error != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		if user.IsBanned {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User is banned"})
			return
		}

		if user.IsLoggedIn {
			c.JSON(http.StatusForbidden, gin.H{"error": "User is already logged in"})
			return
		}

		// function untuk compare password di hash
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		expirationTime := time.Now().Add(12 * time.Hour) // expiration time 12 jam since the creation
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

		user.IsLoggedIn = false
		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}

		cookieName := "jwt"
		cookieValue := signedToken
		maxAge := 60 * 60 * 12 // 12 jam
		path := "/"            // terima semua path
		domain := ""           // terima semua domain
		secure := false        // terima http, tapi kalau https harus true
		httpOnly := false      //

		c.SetCookie(cookieName, cookieValue, maxAge, path, domain, secure, httpOnly)

		c.JSON(http.StatusOK, gin.H{"msg": "Login successful, Redirecting...", "token": signedToken})
	}
}

func LogoutHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// === EXTRACT THE USER ID FROM THE JWT TOKEN ===

		cookie, err := c.Cookie("jwt")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "JWT token not found"})
			return
		}

		userID := extractIdFromCookie(cookie, c)
		if userID == 999999999 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to extract user ID from token"})
		}

		// === UPDATE THE USER IS_LOGGED_IN STATUS TO FALSE ===
		var user model.User
		if err := db.First(&user, userID).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
			return
		}

		user.IsLoggedIn = false
		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
			return
		}

		// === CLEAR JWT TOKEN FROM THE COOKIE ===
		cookieName := "jwt"
		cookieValue := ""
		maxAge := -1
		path := "/"       // accept all paths
		domain := ""      // accept all domains
		secure := false   // accept http, but should be true for https
		httpOnly := false // accessible from frontend

		c.SetCookie(cookieName, cookieValue, maxAge, path, domain, secure, httpOnly)

		c.JSON(http.StatusOK, gin.H{"msg": "Logout successful"})
	}
}

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		const BearerSchema = "Bearer "
		header := c.GetHeader("Authorization")
		if header == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No authorization header provided"})
			return
		}

		// get token (ini karena formatnya di Header Authorization "Bearer <token>" jadi kita ambil tokennya aja)
		tokenString := header[len(BearerSchema):]

		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "JWT secret is not set"})
			return
		}

		token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecret), nil
		})

		if err != nil {
			fmt.Println(err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		if claims, ok := token.Claims.(*jwt.StandardClaims); ok && token.Valid {
			c.Set("userID", claims.Subject)
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			return
		}

		c.Next()
	}
}

// ================================================================================

// === FORGOT PASSWORD ===
func ForgetPassword(db *gorm.DB) gin.HandlerFunc {
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

		if user.IsBanned {
			c.JSON(http.StatusForbidden, gin.H{"error": "Account is banned"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Forget password process initiated", "securityQuestion": user.PersonalSecurityQuestion})
	}
}

func ResetPassword(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email          string `json:"email"`
			SecurityAnswer string `json:"securityAnswer"`
			NewPassword    string `json:"newPassword"`
		}
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
			return
		}

		// Check if the email exists in the database
		var user model.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Email does not exist"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}

		// Validate personal security answer
		if user.PersonalSecurityAnswer != req.SecurityAnswer {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Incorrect personal security answer"})
			return
		}

		// Set new password
		if err := user.SetPassword(req.NewPassword); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to set new password"})
			return
		}

		// Save updated user with new password
		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
	}
}
