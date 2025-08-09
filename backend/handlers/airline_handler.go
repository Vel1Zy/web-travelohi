package handler

import (
	"net/http"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateAirlineHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var airline model.Airline
		if err := c.ShouldBindJSON(&airline); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if airline.AirlineName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Airline name cannot be empty"})
			return
		}

		result := db.Create(&airline)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Airline created successfully", "airline": airline})
	}
}

func GetAllAirlinesHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var airlines []model.Airline
		result := db.Find(&airlines)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}
		c.JSON(http.StatusOK, airlines)
	}
}
