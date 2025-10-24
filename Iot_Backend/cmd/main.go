package main

import (
	"Iot_Backend/internal/adapter"
	"Iot_Backend/internal/adapter/handler/http"
	"Iot_Backend/internal/core/service"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	influx "github.com/influxdata/influxdb1-client/v2"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func main() {
	app := fiber.New()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("load .env error")
	}

	app.Use(cors.New(cors.Config{
		AllowOrigins: os.Getenv("ORIGIN"),
		AllowMethods: "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	app.Use(logger.New(logger.Config{
		Format: "${ip}:${port} ${status} - ${method} ${path}\n",
	}))

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	addr := fmt.Sprintf("http://%s:%s", host, port)
	c, err := influx.NewHTTPClient(influx.HTTPConfig{
		Addr:     addr,
		Username: user,
		Password: password,
	})
	if err != nil {
		log.Fatal(err)
	}

	influxRepo := adapter.NewInfluxPmAdapter(c, dbName)
	pmService := service.NewPmService(influxRepo)
	pmHandler := handler.NewHttpPmHandler(pmService)

	app.Get("/api/test", func (c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "API is working",
		})
	})
	app.Get("/api/pm/getPm", pmHandler.GetPm)

	app.Listen(":3000")
}
