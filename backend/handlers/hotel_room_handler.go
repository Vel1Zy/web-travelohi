package handler

import (
	"net/http"
	"strconv"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetHotelRoomByHotelID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		hotelIDStr := c.Param("id")
		hotelID, err := strconv.ParseUint(hotelIDStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid hotel ID"})
			return
		}

		var hotel model.Hotel
		result := db.Preload("HotelRoom").First(&hotel, hotelID)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, hotel.HotelRoom)
	}
}

func CreateHotelRoom(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var room model.HotelRoom
		if err := c.ShouldBindJSON(&room); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result := db.Create(&room)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Hotel room created successfully", "room": room})
	}
}

func GetAllHotelRoomHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotelRooms []model.HotelRoom
		if err := db.Find(&hotelRooms).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch hotel rooms"})
			return
		}

		c.JSON(http.StatusOK, hotelRooms)
	}
}

func GetAllHotelAndHotelRoomHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotels []model.Hotel
		if err := db.Find(&hotels).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch hotels and hotel rooms"})
			return
		}

		c.JSON(http.StatusOK, hotels)
	}
}

func GetHotelRoomByIDHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the id parameter from the URL
		idStr := c.Param("id")

		// Convert the id parameter to uint
		id, err := strconv.ParseUint(idStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
			return
		}

		// Query the database to find the hotel room with the specified ID
		var hotelRoom model.HotelRoom
		var roomReview []model.HotelReview

		result := db.First(&hotelRoom, id)
		db.Find(&roomReview, "hotel_id = ?", idStr)

		if result.Error != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Hotel room not found"})
			return
		}

		type Response struct {
			Room    model.HotelRoom
			Reviews []model.HotelReview
		}

		var x Response
		x.Room = hotelRoom
		x.Reviews = roomReview
		// Return the hotel room
		c.JSON(http.StatusOK, x)
	}
}
