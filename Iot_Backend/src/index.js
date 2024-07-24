import express from "express";
import "dotenv/config";
import pmRouter from "./routes/pm.js";
import influx from "./services/connect.js";
import cors from "cors";
const port = 3000;
const app = express();

app.use(
  cors({
    origin: "http://pm25project.sit.kmutt.ac.th",
    credentials: true,
  })
);

async function getPm() {
  try {
    await influx.getDatabaseNames();
    const measurementName = "CB2310"; // Corrected: Measurement name wrapped in quotes
    const query = `SELECT * FROM "${measurementName}" ORDER BY time DESC`; // Corrected: Measurement name wrapped in quotes
    const result = await influx.query(query);
    console.log("Data from measurement (Newest to Oldest):", measurementName); // Corrected: Measurement name wrapped in quotes
    console.log(result[0].value);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getPm();

influx
  .getDatabaseNames()
  .then((names) => {
    console.log("Connected to InfluxDB!");
  })
  .catch((err) => {
    console.error("Error connecting to InfluxDB:", err);
  });

app.use("/", (req, res) => {
  res.send("This is pm2.5 Project server");
});

app.use("/pm", pmRouter);

app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
