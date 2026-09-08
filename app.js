// app.js

const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const authRoutes = require("./routes/auth");
const roadRoutes = require("./routes/roads");
const reportRoutes = require("./routes/reports");
const routeRoutes = require("./routes/routes");
const sosRoutes = require("./routes/sos");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "smart-logistics-secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/", authRoutes);
app.use("/roads", roadRoutes);
app.use("/reports", reportRoutes);
app.use("/routes", routeRoutes);
app.use("/sos", sosRoutes);

app.get("/", (req, res) => {
  res.render("index", {
    user: req.session.user || null
  });
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  res.render("dashboard", {
    user: req.session.user
  });
});

app.get("/admin", (req, res) => {
  if (!req.session.user || req.session.user.role !== "ADMIN") {
    return res.status(403).send("Access denied");
  }

  res.render("admin", {
    user: req.session.user
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Smart Logistics running on port ${PORT}`);
});