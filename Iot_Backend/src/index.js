import express from "express";
import "dotenv/config";
import influx from "./services/connect.js";
import pmRouter from "./routes/pm.js";
import cors from "cors";
const port = 3000;
// app.use("/", pmRouter);
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// influx.getDatabaseNames()
//   .then(names => {
//     console.log('Connected to InfluxDB!');
//     console.log('Available databases:', names);
//   })
//   .catch(err => {
//     console.error('Error connecting to InfluxDB:', err);
//   });

//   const query = 'SELECT * FROM sensor';
// influx.query(query)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// Function to execute the SHOW MEASUREMENTS query
async function showMeasurements() {
  try {
    // Connect to InfluxDB
    await influx.getDatabaseNames(); // Ensure connection by getting database names

    // Execute SHOW MEASUREMENTS query
    const measurements = await influx.getMeasurements();

    // Print the list of measurements
    console.log("Measurements (Tables):", measurements);
  } catch (error) {
    console.error("Error fetching measurements:", error);
  }
}

// Call the function to execute the SHOW MEASUREMENTS query
showMeasurements();

// app.use("/",pmRouter);

// async function getPm() {
//   try {
//     await influx.getDatabaseNames();
//     const measurementName = "esp8266_04"; // Corrected: Measurement name wrapped in quotes
//     const query = `SELECT * FROM "${measurementName}" ORDER BY time DESC`; // Corrected: Measurement name wrapped in quotes
//     const result = await influx.query(query);
//     console.log("Data from measurement (Newest to Oldest):", measurementName); // Corrected: Measurement name wrapped in quotes
//     console.log(result[0].value);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// getPm();
app.use("/pm", pmRouter);

app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
