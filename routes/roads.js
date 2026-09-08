// routes/roads.js

const express = require("express");
const router = express.Router();

const {
  getRoads,
  getRoad,
  addRoad
} = require("../controllers/roadController");

router.get("/", getRoads);
router.get("/:id", getRoad);
router.post("/", addRoad);

module.exports = router;