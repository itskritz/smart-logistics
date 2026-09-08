// controllers/roadController.js

const pool = require("../db/pool");

const getRoads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM roads ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch roads");
  }
};

const getRoad = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM roads WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Road not found");
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch road");
  }
};

const addRoad = async (req, res) => {
  try {
    const {
      name,
      location,
      latitude,
      longitude,
      condition,
      risk_level
    } = req.body;

    const result = await pool.query(
      `INSERT INTO roads
       (name, location, latitude, longitude, condition, risk_level)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name,
        location,
        latitude,
        longitude,
        condition,
        risk_level || "LOW"
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to add road");
  }
};

module.exports = {
  getRoads,
  getRoad,
  addRoad
};