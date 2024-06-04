import Influx from "influx";
import dotenv from "dotenv";

dotenv.config();

const influx = new Influx.InfluxDB({
  host: process.env.host,
  port: process.env.port,
  username: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

export default influx;
