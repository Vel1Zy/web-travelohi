package model

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Promo struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	PromoName       string    `json:"promoName"`
	PromoPictureURL string    `json:"promoPictureURL"`
	CreatedAt       time.Time `json:"createdAt"`
	PromoCode       string    `json:"promoCode"`
	StartFrom       string    `json:"startFrom"`
	EndAt           string    `json:"endAt"`
}

func CreatePromoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var promo Promo
		if err := c.ShouldBindJSON(&promo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// validasi kosong
		if promo.PromoName == "" || promo.PromoPictureURL == "" || promo.PromoCode == "" || promo.StartFrom == "" || promo.EndAt == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
			return
		}

		// validasi double
		if err := db.Where("promo_code = ?", promo.PromoCode).Or("promo_name = ?", promo.PromoName).First(&Promo{}).Error; err == nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Promo code or name already exists"})
			return
		}

		result := db.Create(&promo)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Promo created successfully", "promo": promo})
	}
}

func ReadPromoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var promos []Promo
		result := db.Find(&promos)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"promos": promos})
	}
}

func GetPromoByIDHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		promoID := c.Param("id")

		var promo Promo
		result := db.First(&promo, promoID)
		if result.Error != nil {
			if result.Error == gorm.ErrRecordNotFound {
				c.JSON(http.StatusNotFound, gin.H{"error": "Promo not found"})
				return
			}
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"promo": promo})
	}
}

func UpdatePromoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		promoID := c.Param("id")

		var promo Promo
		result := db.First(&promo, promoID)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		if err := c.ShouldBindJSON(&promo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		result = db.Save(&promo)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Promo updated successfully", "promo": promo})
	}
}

func DeletePromoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		promoID := c.Param("id")

		var promo Promo
		result := db.First(&promo, promoID)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		result = db.Delete(&promo)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Promo deleted successfully"})
	}
}

func PatchPromoHandler(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		promoID := c.Param("id")

		var promo Promo
		result := db.First(&promo, promoID)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		// Bind the JSON data to a temporary struct
		var patchData struct {
			PromoName       *string `json:"promoName"`
			PromoPictureURL *string `json:"promoPictureURL"`
			StartFrom       *string `json:"startFrom"`
			EndAt           *string `json:"endAt"`
		}
		if err := c.ShouldBindJSON(&patchData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Update the fields if they are provided in the patch data
		if patchData.PromoName != nil {
			promo.PromoName = *patchData.PromoName
		}
		if patchData.PromoPictureURL != nil {
			promo.PromoPictureURL = *patchData.PromoPictureURL
		}
		if patchData.StartFrom != nil {
			promo.StartFrom = *patchData.StartFrom
		}
		if patchData.EndAt != nil {
			promo.EndAt = *patchData.EndAt
		}

		result = db.Save(&promo)
		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Promo patched successfully", "promo": promo})
	}
}
