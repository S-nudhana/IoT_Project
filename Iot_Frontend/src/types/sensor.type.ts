export type Sensor = {
  buildingRoom: string;
  building: string;
  floor: number;
  key: string | string[];
  chart: string;
  outdoor?: boolean;
}