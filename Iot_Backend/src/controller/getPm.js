import influx from "../services/connect.js";

async function getPm(req, res) {
  const id = req.query.id;
  try {
    await influx.getDatabaseNames();
    const query = `SELECT value FROM "${id}" ORDER BY time DESC`;
    const result = await influx.query(query);
    if (Array.isArray(result) && result.length > 0) {
      return res.json({
        success: true,
        data: result[0].value,
      });
    } else {
      return res.json({
        success: false,
        data: null,
        error: "No data found",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      success: false,
      data: null,
      error: "Internal server error",
    });
  }
}

export default getPm;
