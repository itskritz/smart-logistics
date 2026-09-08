// controllers/routeController.js

const pool = require("../db/pool");
const predictRoute = require("../ai/prediction");

const showRoutes = (req, res) => {
  res.render("routes", {
    user: req.session.user || null,
    routeResult: null
  });
};

const findRoute = async (req, res) => {
  try {
    const { start, destination } = req.body;

    if (!start || !destination) {
      return res.status(400).send("Start and destination are required");
    }

    const routeResult = await predictRoute(start, destination);

    await pool.query(
      `INSERT INTO routes
       (start_location, destination, distance, estimated_time, risk_level)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        start,
        destination,
        routeResult.distance,
        routeResult.estimatedTime,
        routeResult.riskLevel
      ]
    );

    res.render("routes", {
      user: req.session.user || null,
      routeResult
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to find route");
  }
};

module.exports = {
  showRoutes,
  findRoute
};