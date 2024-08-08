import influx from "../services/connect.js";

async function getPm(req, res) {
  const ids = req.query.id.split(",");
  const now = new Date();

  try {
    const promises = ids.map((id) =>
      influx.query(`SELECT * FROM "${id}" ORDER BY time DESC LIMIT 1`)
    );
    const results = await Promise.all(promises);
    let divider = 0;
    if (results.every((result) => Array.isArray(result) && result.length > 0)) {
      const values = results.map((result) => {
        const record = result[0];
        const recordTime = new Date(record.time);
        const timeDifference = (now - recordTime) / (1000 * 60);
        if (timeDifference > 30) {
          return 0;
        }
        divider = record.value === 0 ? divider : divider + 1;
        return record.value;
      });
      const averageValue = Math.round(values.reduce((sum, value) => sum + value, 0) / divider);
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
