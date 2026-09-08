// routes/reports.js

const express = require("express");
const router = express.Router();

const {
  getReports,
  showReportForm,
  createReport,
  getReport,
  updateReportStatus
} = require("../controllers/reportController");

router.get("/", getReports);
router.get("/new", showReportForm);
router.post("/", createReport);
router.get("/:id", getReport);
router.post("/:id/status", updateReportStatus);

module.exports = router;