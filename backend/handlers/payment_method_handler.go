package handler

import (
	"net/http"
	model "traveloHI/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePaymentMethodHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var paymentMethod model.PaymentMethod
		if err := c.ShouldBindJSON(&paymentMethod); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if paymentMethod.UserID < 1 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "UserID cannot be verified"})
			return
		}

		if paymentMethod.CardNumber == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "CardNumber cannot be empty"})
			return
		}
		if paymentMethod.CardHolderName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "CardHolderName cannot be empty"})
			return
		}
		if paymentMethod.CardExpiredDate == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "CardExpiredDate cannot be empty"})
			return
		}
		if paymentMethod.CVV == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "CVV cannot be empty"})
			return
		}
		if paymentMethod.BankName == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "BankName cannot be empty"})
			return
		}

		result := db.Create(&paymentMethod)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusCreated, paymentMethod)
	}
}

func DeletePaymentMethodHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		paymentMethodID := c.Param("id")

		var paymentMethod model.PaymentMethod
		result := db.First(&paymentMethod, paymentMethodID)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		result = db.Delete(&paymentMethod)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Payment method deleted successfully"})
	}
}
