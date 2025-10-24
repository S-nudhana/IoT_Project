package service

import (
	"Iot_Backend/internal/core/port"
	"context"
	"errors"
	"time"
)

type PmService interface {
	GetPmData(ctx context.Context, ids []string) (int, error)
}

type PmServiceImplement struct {
	repo port.PmRepository
}

func NewPmService(repo port.PmRepository) PmService {
	return &PmServiceImplement{repo: repo}
}

func (s *PmServiceImplement) GetPmData(ctx context.Context, ids []string) (int, error) {
	pmData, err := s.repo.GetAll(ctx, ids)
	if err != nil {
		return 0, err
	}

	if len(pmData) == 0 {
		return 0, errors.New("PM data is empty")
	}

	now := time.Now()
	sum := 0.0
	divider := 0

	for _, pm := range pmData {
		recordTime, err := time.Parse(time.RFC3339, pm.Time)
		if err != nil {
			continue
		}
		recordTime = recordTime.Local()
		if now.Sub(recordTime).Minutes() <= 30 {
			if pm.Value != 0 {
				divider++
			}
			sum += pm.Value
		}
	}

	if divider == 0 {
		return 0, errors.New("no valid PM data within 30 minutes")
	}

	average := int(sum/float64(divider) + 0.5)
	return average, nil
}
