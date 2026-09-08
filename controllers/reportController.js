// controllers/reportController.js

const pool = require("../db/pool");

const getReports = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT reports.*, users.name AS user_name
      FROM reports
      LEFT JOIN users ON reports.user_id = users.id
      ORDER BY reports.created_at DESC
    `);

    res.render("reports", {
      reports: result.rows,
      user: req.session.user || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch reports");
  }
};

const showReportForm = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("report", {
    user: req.session.user
  });
};

const createReport = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const {
      roadId,
      issueType,
      severity,
      description,
      latitude,
      longitude
    } = req.body;

    await pool.query(
      `INSERT INTO reports
       (user_id, road_id, issue_type, severity, description, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.session.user.id,
        roadId || null,
        issueType,
        severity,
        description,
        latitude || null,
        longitude || null
      ]
    );

    res.redirect("/reports");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create report");
  }
};

const getReport = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT reports.*, users.name AS user_name
       FROM reports
       LEFT JOIN users ON reports.user_id = users.id
       WHERE reports.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Report not found");
    }

    res.render("report", {
      report: result.rows[0],
      user: req.session.user || null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch report");
  }
};

const updateReportStatus = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "ADMIN") {
      return res.status(403).send("Access denied");
    }

    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      "UPDATE reports SET status = $1 WHERE id = $2",
      [status, id]
    );

    res.redirect("/reports");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to update report");
  }
};

module.exports = {
  getReports,
  showReportForm,
  createReport,
  getReport,
  updateReportStatus
};