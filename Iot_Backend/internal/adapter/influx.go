package adapter

import (
	"Iot_Backend/internal/core/domain"
	"Iot_Backend/internal/core/port"
	"context"
	"encoding/json"
	"fmt"
	influx "github.com/influxdata/influxdb1-client/v2"
)

type InfluxPmAdapter struct {
	client   influx.Client
	database string
}

func NewInfluxPmAdapter(client influx.Client, dbName string) port.PmRepository {
	return &InfluxPmAdapter{
		client:   client,
		database: dbName,
	}
}

func (r *InfluxPmAdapter) GetAll(ctx context.Context, ids []string) ([]domain.Pm, error) {
	var data []domain.Pm

	for _, id := range ids {
		q := fmt.Sprintf(`SELECT * FROM "%s" WHERE sensor='PM2.5' ORDER BY time DESC LIMIT 1`, id)
		query := influx.NewQuery(q, r.database, "")
		response, err := r.client.Query(query)
		if err != nil {
			return nil, fmt.Errorf("influx query failed: %v", err)
		}
		if response.Error() != nil {
			return nil, fmt.Errorf("influx response error: %v", response.Error())
		}

		for _, result := range response.Results {
			for _, series := range result.Series {
				colIndex := map[string]int{}
				for i, col := range series.Columns {
					colIndex[col] = i
				}

				for _, row := range series.Values {
					timeStr, ok := row[0].(string)
					if !ok {
						continue
					}
					var value float64
					switch v := row[4].(type) {
					case float64:
						value = v
					case json.Number:
						f, _ := v.Float64()
						value = f
					default:
						continue
					}
					data = append(data, domain.Pm{
						Time:  timeStr,
						Value: value,
					})
				}
			}
		}
	}
	return data, nil
}
