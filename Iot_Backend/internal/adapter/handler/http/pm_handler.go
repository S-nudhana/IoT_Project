package http

import (
	"context"
	"strings"
	"github.com/gofiber/fiber/v2"
	"Iot_Backend/internal/core/service"
)

type HttpPmHandler struct {
	service service.PmService
}

func NewHttpPmHandler(service service.PmService) *HttpPmHandler {
	return &HttpPmHandler{service: service}
}

func (h *HttpPmHandler) GetPm(c *fiber.Ctx) error {
	idsParam := c.Query("id")
	if idsParam == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"data":    nil,
			"error":   "No IDs provided",
		})
	}

	ids := strings.Split(idsParam, ",")
	ctx := context.Background()

	average, err := h.service.GetPmData(ctx, ids)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"data":    nil,
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data":    average,
	})
}