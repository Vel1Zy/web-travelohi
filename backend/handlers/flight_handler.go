package handler

import (
	"fmt"
	"net/http"
	"strconv"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateFlightHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var flight model.Flight
		if err := c.ShouldBindJSON(&flight); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// validasi kosong
		if flight.AirlineID == 0 ||
			flight.FlightName == "" ||
			flight.AirplaneCode == "" ||
			flight.FlightDescription == "" ||
			flight.FlightDuration == "" ||
			flight.FlightDepartureLocation == "" ||
			flight.FlightArrivalLocation == "" ||
			flight.FlightDepartureTime == "" ||
			flight.FlightArrivalTime == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "All fields must be provided"})
			return
		}

		if err := db.Create(&flight).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, flight)
	}
}

func GetFlightByAirlineIDHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		airlineIDStr := c.Param("id")
		airlineID, err := strconv.ParseUint(airlineIDStr, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid airline ID"})
			return
		}

		var flights []model.Flight
		result := db.Where("airline_id = ?", airlineID).Find(&flights)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch flights"})
			return
		}
		fmt.Println(flights)

		c.JSON(http.StatusOK, flights)
	}
}

func GetFlightListHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var flights []model.Flight
		result := db.Find(&flights)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, flights)
	}
}

// GetFlightListHandler retrieves the flight list by airline ID.
func GetFlightListHandlerkontol(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Retrieve airline ID from URL parameter
		airlineID := c.Param("id")

		// Query the database to get the flight list by airline ID
		var flights []model.Flight
		if err := db.Where("airline_id = ?", airlineID).Find(&flights).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch flight list"})
			return
		}

		// Return the flight list
		c.JSON(http.StatusOK, flights)
	}
}
