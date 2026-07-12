package main

import (
	"ai-workflow-server/database"
	"ai-workflow-server/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Println(".env file not found")
	}

	database.ConnectDatabase()

	router := gin.Default()

	router.Use(cors.Default())

	routes.SetupRoutes(router)

	router.Run(":8080")
}