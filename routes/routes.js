// routes/routes.js

const express = require("express");
const router = express.Router();

const {
  showRoutes,
  findRoute
} = require("../controllers/routeController");

router.get("/", showRoutes);
router.post("/find", findRoute);

module.exports = router;