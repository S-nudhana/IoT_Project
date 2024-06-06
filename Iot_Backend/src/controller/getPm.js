import influx from "../services/connect.js";

async function getPm(req, res) {
  const ids = req.query.id.split(','); // Allow multiple keys separated by commas
  try {
    await influx.getDatabaseNames();
    const promises = ids.map(id => influx.query(`SELECT value FROM "${id}" ORDER BY time DESC LIMIT 1`));
    const results = await Promise.all(promises);

    if (results.every(result => Array.isArray(result) && result.length > 0)) {
      const values = results.map(result => result[0].value);
      const averageValue = values.reduce((sum, value) => sum + value, 0) / values.length;
      return res.json({
        success: true,
        data: averageValue,
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
