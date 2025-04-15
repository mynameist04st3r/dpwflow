const express = require("express");
const router = express.Router();
const knex = require("knex")(
  require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const { hash, compare } = require("@uswriting/bcrypt");

router.get("/", async (req, res) => {
  try {
    const { user_id, user_role } = req.query;

    let query = knex("users");

    if (user_id) {
      query = query.where("id", user_id);
    } else if (user_role) {
      query = query.where("role", user_role);
    }

    const users = await query.select("*");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.patch("/:id/role", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (role === undefined) {
    return res.status(400).json({ error: "Missing required field: role" });
  }

  // guard to block managers from assigning admin role
  if (req.user?.role < 4 && parseInt(role) === 4) {
    return res.status(403).json({ error: "Only admins can assign admin roles." });
  }

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await knex("users").where({ id }).update({ role });

    const updatedUser = await knex("users")
      .where({ id })
      .select("id", "first_name", "last_name", "username", "role")
      .first();

    res.status(200).json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
});


router.patch("/:id/credentials", async (req, res) => {
  const { id } = req.params;
  const { username, password, current_password } = req.body;

  if (!username && !password) {
    return res.status(400).json({
      error: "You must provide at least a username or password to update",
    });
  }

  try {
    const user = await knex("users").where({ id }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password) {
      if (!current_password) {
        return res
          .status(400)
          .json({ error: "Current password is required to change password" });
      }

      const isMatch = await compare(current_password, user.password);
      if (!isMatch) {
        return res.status(403).json({ error: "Current password is incorrect" });
      }
    }

    const updateData = {};

    if (username) updateData.username = username;
    if (password) updateData.password = await hash(password, 10);

    await knex("users").where({ id }).update(updateData);

    const updatedUser = await knex("users")
      .select("id", "username", "email")
      .where({ id })
      .first();

    res.status(200).json({
      message: "Credentials updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating credentials:", err);
    res.status(500).json({ error: "Failed to update credentials" });
  }
});

router.patch("/:id/profile", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, rank, email, phone_number } = req.body;

  if (!first_name || !last_name || !email || !phone_number) {
    return res.status(400).json({
      error:
        "Missing required fields: first_name, last_name, email, or phone_number",
    });
  }

  try {
    const user = await knex("users").where({ id }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await knex("users")
      .where({ id })
      .update({ first_name, last_name, rank, email, phone_number });

    const updatedUser = await knex("users")
      .select("id", "first_name", "last_name", "rank", "email", "phone_number")
      .where({ id })
      .first();

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
