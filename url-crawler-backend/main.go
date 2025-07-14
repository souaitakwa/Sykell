package main

import (
	"log"
	"net/http"
	"os"
	"url-crawler-backend/db"
	"url-crawler-backend/handlers"
	"url-crawler-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Init()
	db.DB.AutoMigrate(&models.URL{}, &models.BrokenLink{})
	log.Println("✅ AutoMigrate done!")

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Authorization", "Content-Type"},
	}))

	api := router.Group("/api", authorizeMiddleware())
	{
		api.GET("/urls", handlers.GetUrls)
		api.POST("/urls", handlers.CreateUrl)
		api.DELETE("/urls/:id", handlers.DeleteUrl)
	}

	log.Println("✅ Server started on :8080")
	log.Fatal(router.Run(":8080"))
}

func authorizeMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth != "Bearer "+os.Getenv("API_TOKEN") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		c.Next()
	}
}
