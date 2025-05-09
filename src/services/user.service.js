const { hashingPassword, compareHashed } = require("../utils/hashing");
const { genToken } = require("../utils/gentoken");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function createUser({ username, email, password, role }) {
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw { status: 409, message: "Username already taken" };
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw { status: 409, message: "Email already registered" };
  }

  const hashedPassword = await hashingPassword(password);

  const user = new User({
    username,
    password: hashedPassword,
    email,
    role,
  });

  await user.save();

  return { message: "User registered successfully" };
}

async function loginUser({ username, password }) {
  const user = await User.findOne({ username });
  if (!user) {
    return { message: "Invalid credentials" };
  }

  const isMatch = await compareHashed(password, user.password);
  if (!isMatch) {
    return { message: "Invalid credentials" };
  }

  const token = genToken(user._id);
  console.log(user);
  return {
    auth_token: token,
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
      role: user.role,
    },
  };
}

async function updateUser(userId, newEmail) {
  try {
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return { error: true, status: 409, message: "Email already registered" };
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return { error: true, status: 404, message: "User not found" };
    }

    return { status: 200, message: "Email updated successfully" };
  } catch (err) {
    return {
      error: true,
      status: err.status || 500,
      message: err.message || "Internal server error",
    };
  }
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
};
