// controllers/authController.js

const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

const showLogin = (req, res) => {
  res.render("login");
};

const showRegister = (req, res) => {
  res.render("register");
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).send("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );

    req.session.user = result.rows[0];

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    }

    delete user.password;

    req.session.user = user;

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Login failed");
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  showLogin,
  login,
  showRegister,
  register,
  logout
};