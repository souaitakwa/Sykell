package handlers

import (
	"net/http"
	"url-crawler-backend/db"
	"url-crawler-backend/models"

	"github.com/gin-gonic/gin"
)

func GetUrls(c *gin.Context) {
	var urls []models.URL
	db.DB.Preload("BrokenLinkDetails").Find(&urls)
	c.JSON(http.StatusOK, urls)
}

func CreateUrl(c *gin.Context) {
	var input models.URL
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.DB.Create(&input)
	c.JSON(http.StatusCreated, input)
}

func DeleteUrl(c *gin.Context) {
	id := c.Param("id")
	db.DB.Delete(&models.URL{}, id)
	c.Status(http.StatusNoContent)
}
