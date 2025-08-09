package handler

import (
	"net/http"
	"os"
	"strconv"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func extractIdFromCookie(cookie string, c *gin.Context) int {

	token, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse JWT token"})
		return 999999999
	}

	if !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid JWT token"})
		return 999999999
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token claims"})
		return 999999999
	}
	userIDString, ok := claims["sub"].(string)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format in token claims"})
		return 999999999
	}

	userID, err := strconv.Atoi(userIDString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format in token claims"})
		return 999999999
	}

	return userID
}
