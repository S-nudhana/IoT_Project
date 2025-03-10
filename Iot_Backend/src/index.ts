import express from "express";
import "dotenv/config";
import pmRouter from "./routes/pm"; 
import influx from "./services/connect";
import cors from "cors";

import { corsOptions } from "./config/corsConfig";
import { logger } from "./middleware/logger";

const PORT = process.env.PORT || 3000;
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

app.use("/api/pm", pmRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
