import express from "express";
import "dotenv/config";
import pmRouter from "./routes/pm.js";
import influx from "./services/connect.js";
import cors from "cors";
const port = 3000;
const app = express();

app.use(
  cors({
    origin: "https://pm25project.sit.kmutt.ac.th",
    credentials: true,
  })
);

influx
  .getDatabaseNames()
  .then((names) => {
    console.log("Connected to InfluxDB!");
  })
  .catch((err) => {
    console.error("Error connecting to InfluxDB:", err);
  });

app.use(express.json());
app.use("/pm", pmRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
