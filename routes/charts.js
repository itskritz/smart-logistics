// routes/charts.js

const express = require("express");
const router = express.Router();

const chartController = require("../controllers/chartController");

router.get("/reports-status", chartController.getDashboardChartData);

module.exports = router;