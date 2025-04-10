const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

// Create user
// app.post("/users", async (req, res) => {
//   const { username } = req.body;

//   if (!username) {
//     return res.status(400).json({ error: "Username is required" });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO users (username) VALUES ($1) RETURNING *",
//       [username]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     if (err.code === "23505") {
//       return res.status(409).json({ error: "Username already exists" });
//     }
//     console.error("Create user error:", err);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });


module.exports = router;