import express from "express";
import "dotenv/config";
import pmRouter from "./routes/pm.js";
import influx from "./services/connect.js";
import cors from "cors";
const port = 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

influx.getDatabaseNames()
  .then(names => {
    console.log('Connected to InfluxDB!');
    console.log('Available databases:', names);
  })
  .catch(err => {
    console.error('Error connecting to InfluxDB:', err);
  });

app.use("/pm", pmRouter);

app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});