import influx from "../services/connect.js";

async function getPm(req, res) {
  const id = req.query.id;
  try {
    await influx.getDatabaseNames();
    const query = `SELECT value FROM "${id}" ORDER BY time DESC`;
    const result = await influx.query(query);
    // console.log("Data from measurement (Newest to Oldest):", id);
    // console.log(result[0].value); // Log the entire result to inspect its structure
    // Check if result is an array and has at least one item
    if (Array.isArray(result) && result.length > 0) {
      // Assuming result[0] contains the desired data
      return res.json({
        success: true,
        data: result[0].value, // Return the first item from the result array
        error: null,
      });
    } else {
      return res.json({
        success: false,
        data: null,
        error: "No data found", // Provide an error message indicating no data found
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error", // Provide an error message for internal server error
    });
  }
}

export default getPm;
