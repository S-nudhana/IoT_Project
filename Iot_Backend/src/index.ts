import express from "express";
import pmRouter from "./routes/pm"; 
import influx from "./services/connect";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { corsOptions } from "./config/cors.Config";
import { logger } from "./middleware/logger";


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

influx
.getDatabaseNames()
.then((names) => {
  console.log("Connected to InfluxDB!");
})
.catch((err) => {
  console.error("Error connecting to InfluxDB:", err);
});

app.use("/pm", pmRouter); 


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
