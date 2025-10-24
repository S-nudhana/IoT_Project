package handler

import (
	"github.com/gofiber/fiber/v2"
	"Iot_Backend/internal/adapter/handler/http"
)

func PmRoutes(app *fiber.App, p *http.HttpPmHandler) {
	pm := app.Group("/api/pm")

	pm.Get("/getPm", p.GetPm)
}