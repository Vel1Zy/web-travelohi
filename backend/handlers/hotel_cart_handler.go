package handler

import (
	"net/http"
	"time"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllUserHotelCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotelCarts []model.HotelCart
		userId := c.Param("id")
		db.Where("user_id = ?", userId).Find(&hotelCarts)

		c.JSON(http.StatusOK, hotelCarts)
	}
}

func CreateHotelCart(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var hotelCart model.HotelCart

		if err := c.ShouldBindJSON(&hotelCart); err != nil {
			layout := "2006-01-02 15:04:05"

			// Parse the string into a time object
			first, _ := time.Parse(layout, hotelCart.CheckInDate+" 15:04:05")
			second, _ := time.Parse(layout, hotelCart.CheckOutDate+" 15:04:05")

			if first.Before(second) {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Check out date must be after check in date"})
				return
			}

			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		db.Create(&hotelCart)

		c.JSON(http.StatusCreated, hotelCart)
	}
}
