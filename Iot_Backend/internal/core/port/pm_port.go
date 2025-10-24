package port

import (
	"context"
	"Iot_Backend/internal/core/domain"
)

type PmRepository interface {
	GetAll(ctx context.Context, ids []string) ([]domain.Pm, error)
}