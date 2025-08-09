package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func protectedRouteHandler(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	c.JSON(http.StatusOK, gin.H{
		"message": "You have accessed a protected route!",
		"userID":  userID,
	})
}
