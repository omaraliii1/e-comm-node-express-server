const User = require("../models/User");

function notAuth(req, res) {
  res.status(200).json("Welcome to the Home Page!");
}

async function auth(req, res) {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Authenticated user",
      id: userId,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { auth, notAuth };
