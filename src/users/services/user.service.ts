import User from "../models/user.model";
import { genToken } from "../../utils/gentoken";
import { createBaseError } from "../../utils/baseErrorHandler";
import { hashingPassword, compareHashed } from "../../utils/hashing";
import { IUser, loggedInUserResponse } from "../interfaces/user.interface";

export const createUser = async (
  email: string,
  username: string,
  password: string,
  role: string
): Promise<IUser> => {
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw createBaseError(409, "Username already exists", []);
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw createBaseError(409, "Email already exists", []);
  }

  const hashedPassword = await hashingPassword(password);

  const user = new User({
    username: username.toLowerCase(),
    password: hashedPassword,
    email: email.toLowerCase(),
    role,
  });
  await user.save();
  console.log(`User ${username} created successfully`);

  return user;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<loggedInUserResponse> => {
  const user = await User.findOne({ username });
  if (!user) {
    throw createBaseError(400, "Invalid credentials", []);
  }

  const isMatch = await compareHashed(password, user.password);
  if (!isMatch) {
    throw createBaseError(400, "Invalid credentials", []);
  }

  const token = genToken(user._id.toString());

  const loggedInUser = {
    auth_token: token,
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return loggedInUser;
};

export const findAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find();
  return users;
};

export const findById = async (userId: string): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) {
    throw createBaseError(404, "User doesn't exist", []);
  }
  return user;
};

export const updateUser = async (
  userId: string,
  newEmail: string
): Promise<IUser> => {
  const user = await findById(userId);

  if (user.email === newEmail) {
    throw createBaseError(400, "Email is the same as current email", [
      "Email is the same as current email",
    ]);
  }
  if (user.email !== newEmail) {
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      throw createBaseError(400, "Email already exists", [
        "Email already exists",
      ]);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true }
  );

  return updatedUser!!;
};

export const userDeletion = async (
  userId: string,
  currentUser: IUser
): Promise<void> => {
  const targetUser = await findById(userId);

  if (currentUser.role !== "admin") {
    throw createBaseError(403, "Unauthorized action", []);
  }

  if (targetUser.role === "admin") {
    // to prevent deleting admin from postman
    throw createBaseError(403, "Cannot delete an admin user", []);
  }

  await User.findByIdAndDelete(userId);

  console.log(
    `User with ID ${userId} has been deleted by ${currentUser.username}`
  );

  return;
};
