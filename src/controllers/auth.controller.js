const { validationResult } = require("express-validator");
const User = require("../models/User");
const {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
} = require("../services/user.service");
const { response } = require("express");

async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userData = req.body;
    // console.log(userData);
    const response = await createUser(userData);
    res.status(201).json(response);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

async function login(req, res) {
  const userData = req.body;

  if (!userData.username || !userData.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const response = await loginUser(userData);
    res.status(201).json(response);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

async function logout(req, res) {
  try {
    const token = req.header("auth_token");
    if (!token) return res.status(400).send("Token required");

    await logoutUser(token);
    res.send("User logged out successfully");
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).send("Failed to process logout");
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(userId);
    console.log(targetUser);

    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    if (targetUser.role === "admin") {
      return res.status(403).json({ message: "Cannot delete another admin" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

    console.log(
      `Admin ${currentUser.username} (${currentUser._id}) deleted user ${targetUser.username} (${targetUser._id})`
    );

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getAllUsers(req, res) {
  const currentUser = await User.findById(req.user.id);
  try {
    if (currentUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find();
    res.json(
      users.map((user) => ({
        username: user.username,
        email: user.email,
        id: user.id,
        role: user.role,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function editUser(req, res) {
  const { email } = req.body;
  try {
    const token = req.header("auth_token");
    if (!token) return res.status(400).send("Token required");
    const response = await updateUser(token, email);
    res.json(response);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

function notAuth(req, res) {
  res.status(200).json({
    message: "Welcome. You are not authenticated.",
  });
}

async function auth(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Authenticated user",
      userId,
      name: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  notAuth,
  auth,
  getUserById,
  getAllUsers,
  editUser,
};
