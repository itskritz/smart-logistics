// controllers/sosController.js

const pool = require("../db/pool");

const showSOS = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("sos", {
    user: req.session.user
  });
};

const createSOS = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const {
      latitude,
      longitude,
      message
    } = req.body;

    await pool.query(
      `INSERT INTO sos_alerts
       (user_id, latitude, longitude, message)
       VALUES ($1, $2, $3, $4)`,
      [
        req.session.user.id,
        latitude,
        longitude,
        message
      ]
    );

    res.redirect("/sos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send SOS");
  }
};

module.exports = {
  showSOS,
  createSOS
};