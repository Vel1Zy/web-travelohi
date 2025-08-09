package handler

import (
	"net/http"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateHotelHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotel model.Hotel
		if err := c.ShouldBindJSON(&hotel); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if hotel.HotelName == "" || hotel.HotelAddress == "" || hotel.HotelDescription == "" || hotel.HotelStar == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "hotelName, hotelAddress, hotelDescription, and hotelStar cannot be empty"})
			return
		}

		var existingHotel model.Hotel
		if err := db.Where("hotel_name = ?", hotel.HotelName).First(&existingHotel).Error; err == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Hotel with the same name already exists"})
			return
		}

		result := db.Create(&hotel)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Hotel created successfully", "hotel": hotel})
	}
}

func GetAllHotels(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotels []model.Hotel
		result := db.Find(&hotels)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}
		c.JSON(http.StatusOK, hotels)
	}
}
