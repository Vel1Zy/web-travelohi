package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	handler "traveloHI/handlers"
	model "traveloHI/models"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func adminProtectedRouteHandler(c *gin.Context) {
	// THIS PARTS GETS THE COOKIE SENT IN THE AUTHORIZATION HEADER AND EXTRACTS THE USER ID INSIDE THE JWT TOKEN
	// if user id > 0, then the user is registered

	tokenCookie, err := c.Request.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "JWT token not found in the cookie"})
		return
	}

	tokenValue := tokenCookie.Value

	token, err := jwt.Parse(tokenValue, func(token *jwt.Token) (interface{}, error) {
		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			return nil, fmt.Errorf("JWT secret is not set")
		}
		return []byte(jwtSecret), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse JWT token"})
		return
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract claims"})
		return
	}

	userIDFloat64, ok := claims["sub"].(float64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract user ID"})
		return
	}

	userID := int(userIDFloat64)

	if userID != 1 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not Admin!!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Access to protected route granted", "userID": userID})
}

func protectedRouteHandler(c *gin.Context) {
	// THIS PARTS GETS THE COOKIE SENT IN THE AUTHORIZATION HEADER AND EXTRACTS THE USER ID INSIDE THE JWT TOKEN
	// if user id > 0, then the user is registered

	tokenCookie, err := c.Request.Cookie("jwt")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "JWT token not found in the cookie"})
		return
	}

	tokenValue := tokenCookie.Value

	token, err := jwt.Parse(tokenValue, func(token *jwt.Token) (interface{}, error) {
		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			return nil, fmt.Errorf("JWT secret is not set")
		}
		return []byte(jwtSecret), nil
	})
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to parse JWT token"})
		return
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
		return
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract claims"})
		return
	}

	userIDFloat64, ok := claims["sub"].(float64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract user ID"})
		return
	}

	userID := int(userIDFloat64)

	if userID < 1 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not registered!!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Access to protected route granted", "userID": userID})
}

func ConnectDatabase() {

	// connect db
	dsn := "host=localhost user=postgres password=Vell1515 dbname=travelohi port=5433 sslmode=disable"

	// init gin
	r := gin.Default()

	// setop cors
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
		ExposeHeaders:    []string{"Set-Cookie"},
	}))

	//connect db
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	// ******************* MIGRATE DATABASE *******************
	MigrateDatabase(db)

	// ===================== ROUTES =====================
	r.POST("/create-user", handler.RegisterUserHandler(db))
	r.POST("/login", handler.LoginHandler(db))
	r.GET("/logout", handler.LogoutHandler(db))
	r.PATCH("/update-user/:id", handler.PatchUser(db))
	r.GET("/protected-route", handler.TokenAuthMiddleware(), protectedRouteHandler)
	r.GET("/user/me", handler.TokenAuthMiddleware(), handler.GetCurrentUserHandler(db))
	r.GET("/current-user", handler.TokenAuthMiddleware(), handler.GetCurrentUserHandler(db))
	r.GET("/testing111", handler.GetUserByCookieID(db))

	// ===================== ADMIN =====================
	r.GET("/users", handler.GetAllUsers(db))
	r.POST("/users/:id/ban", handler.SetUserBannedHandler(db))
	r.GET("/send-email-subscription", handler.SendEmailToSubscribedUsersHandler(db))
	// ===================== OTP =========================
	r.POST("/get-otp", handler.GenerateOTP(db))
	r.POST("/login-otp", handler.ValidateOTP(db))

	// ===================== FORGOT PASSWORD =====================
	r.POST("/forgot-password", handler.ForgetPassword(db))
	r.POST("/reset-password", handler.ResetPassword(db))

	// ===================== PAYMENT METHODS =====================
	r.POST("/payment-methods", handler.CreatePaymentMethodHandler(db))
	r.DELETE("/payment-methods/:id", handler.DeletePaymentMethodHandler(db))

	// ===================== HOTELS =====================
	r.POST("/hotels", handler.CreateHotelHandler(db))
	r.GET("/hotels", handler.GetAllHotels(db))
	// r.GET("/hotels/:id", handler.GetHotelByIDHandler(db))
	// r.POST("/hotels", handler.CreateHotelHandler(db))
	// r.PUT("/hotels/:id", handler.UpdateHotelHandler(db))
	// r.PATCH("/hotels/:id", handler.PatchHotelHandler(db))
	// r.DELETE("/hotels/:id", handler.DeleteHotelHandler(db))

	// ===================== HOTEL ROOMS =====================
	r.GET("/hotel-rooms/:id", handler.GetHotelRoomByHotelID(db))
	r.POST("/hotel-room", handler.CreateHotelRoom(db))
	r.GET("/hotel-room", handler.GetAllHotelRoomHandler(db))
	r.GET("hotel-room/:id", handler.GetHotelRoomByIDHandler(db))
	r.GET("/hotel-room-complete", handler.GetAllHotelAndHotelRoomHandler(db))

	// ===================== AIRLINES =====================
	r.POST("/airline", handler.CreateAirlineHandler(db))
	r.GET("/airline", handler.GetAllAirlinesHandler(db))
	// ===================== Flights =====================
	r.POST("/airline/flight", handler.CreateFlightHandler(db))
	r.GET("/airline/flight/:id", handler.GetFlightByAirlineIDHandler(db))
	r.GET("/airline/flight-list", handler.GetFlightListHandler(db))
	r.GET("/airline/flight-list/:id", handler.GetFlightListHandlerkontol(db))
	//======================= PROMOS =====================
	r.GET("/promos", model.ReadPromoHandler(db))
	r.GET("/promos/:id", model.GetPromoByIDHandler(db))
	r.POST("/promos", model.CreatePromoHandler(db), protectedRouteHandler)
	r.PUT("/promos/:id", model.UpdatePromoHandler(db))
	r.PATCH("/promos/:id", model.PatchPromoHandler(db))
	r.DELETE("/promos/:id", model.DeletePromoHandler(db))

	//======================= GAME ======================
	r.POST("/api/game/check-player", handler.CheckPlayerHandler(db))
	r.POST("/api/game/win-prize", handler.PlayerWinPrize(db))

	//======================= CART ======================
	r.GET("/hotel-cart/:id", handler.GetAllUserHotelCart(db))
	r.POST("/hotel-cart", handler.CreateHotelCart(db))

	r.Run()

}

func MigrateDatabase(db *gorm.DB) {
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Hotel{})
	db.AutoMigrate(&model.Promo{})
	db.AutoMigrate(&model.PaymentMethod{})
	db.AutoMigrate(&model.HotelCart{})
	db.AutoMigrate(&model.HotelRoom{})
	db.AutoMigrate(&model.HotelReview{})
	db.AutoMigrate(&model.CartHistory{})
	db.AutoMigrate(&model.Airline{})
	db.AutoMigrate(&model.Flight{})
	db.AutoMigrate(&model.FlightCart{})
	db.AutoMigrate(&model.FlightReview{})
	db.AutoMigrate(&model.FlightSeat{})

}
