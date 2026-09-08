// routes/sos.js

const express = require("express");
const router = express.Router();

const {
  showSOS,
  createSOS
} = require("../controllers/sosController");

router.get("/", showSOS);
router.post("/", createSOS);

module.exports = router;