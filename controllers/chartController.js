// controllers/chartController.js

const pool = require("../db/pool");

exports.getDashboardChartData = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT status, COUNT(*) AS total
      FROM reports
      GROUP BY status
      ORDER BY status
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to load chart data" });
  }
};