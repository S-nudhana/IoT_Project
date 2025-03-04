import express from "express";
import "dotenv/config";
import pmRouter from "./routes/pm.js";
import influx from "./services/connect.js";
import cors from "cors";

import { corsOptions } from "./config/corsConfig.js";
import { logger } from "./middleware/logger.js";

const port = 3000;
const app = express();

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

influx
  .getDatabaseNames()
  .then((names) => {
    console.log("Connected to InfluxDB!");
  })
  .catch((err) => {
    console.error("Error connecting to InfluxDB:", err);
  });

app.use("/pm", pmRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
