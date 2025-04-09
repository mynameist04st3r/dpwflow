const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const { hash, compare } = require("@uswriting/bcrypt");

// GET /
router.get("/", (req, res) => {
  res.send("Server operational");
});

// POST /signup
router.post("/signup", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      rank,
      password,
      username,
      confirmPassword,
      phone_number,
      email,
    } = req.body;

    if (
      (!first_name ||
        !last_name ||
        !rank ||
        !password ||
        !username ||
        !confirmPassword ||
        !phone_number,
      !email)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill out all fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await knex("users")
      .where("username", username)
      .first();

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await hash(password, 10);

    await knex("users").insert({
      first_name,
      last_name,
      rank,
      password: hashedPassword,
      username,
      phone_number,
      email,
    });

    return res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill out all fields" });
    }

    const user = await knex("users").where("username", username).first();

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username or password" });
    }

    return res.json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
