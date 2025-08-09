package handler

import (
	"net/http"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CheckPlayerHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			Email string `json:"email"`
		}

		var req Request
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		// Query the database to check if the player with the given email exists
		var player model.User
		if err := db.Where("email = ?", req.Email).First(&player).Error; err != nil {
			// Player not found
			c.JSON(http.StatusOK, gin.H{"exists": false})
			return
		}

		// Player found
		c.JSON(http.StatusOK, gin.H{"exists": true})
	}
}

func PlayerWinPrize(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		type Request struct {
			Email string `json:"email"`
		}

		var req Request
		if err := c.BindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
			return
		}

		var user model.User
		if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		user.Balance += 500000

		if err := db.Save(&user).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user's account"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Prize added to user's account"})
	}
}
