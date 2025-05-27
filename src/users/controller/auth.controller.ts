import { Request, Response } from "express";
import {
  findAllUsers,
  findById,
  loginUser,
  updateUser,
  userDeletion,
  createUser,
} from "../services/user.service";
import { loggedInUserResponse, IUser } from "../interfaces/user.interface";
import { BaseResponseHandler } from "../../utils/baseResponseHandler";
import { BaseResponse } from "../../interfaces/responses.interface";
import { createBaseError } from "../../utils/baseErrorHandler";
import { validationResult } from "express-validator";

export const register = async (
  req: Request,
  res: Response<BaseResponse<IUser>>
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createBaseError(
      400,
      "Validation failed",
      errors.array().map((error) => error.msg)
    );
  }
  const { email, username, password, role } = req.body;
  const user = await createUser(email, username, password, role);

  res
    .status(201)
    .json(BaseResponseHandler.create(201, "User created successfully", user));
};

export const login = async (
  req: Request,
  res: Response<BaseResponse<loggedInUserResponse>>
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createBaseError(
      400,
      "Validation failed",
      errors.array().map((error) => error.msg)
    );
  }
  const { username, password } = req.body;
  const result = await loginUser(username, password);

  res
    .status(200)
    .json(BaseResponseHandler.create(200, "Login successful", result));
};

export const deleteUser = async (
  req: Request,
  res: Response<BaseResponse<{}>>
): Promise<void> => {
  const userId = req.params.id;
  const currentUser = await findById(req.user.id);

  await userDeletion(userId, currentUser);
  res
    .status(200)
    .json(BaseResponseHandler.create(200, "User deleted successfully", {}));
};

export const getUserById = async (
  req: Request,
  res: Response<BaseResponse<IUser>>
): Promise<void> => {
  const userId = req.params.id;
  const user = await findById(userId);
  if (!user) {
    throw createBaseError(404, "User not found", []);
  }
  res.status(200).json(BaseResponseHandler.create(200, "User found", user));
};

export const getAllUsers = async (
  req: Request,
  res: Response<BaseResponse<IUser[]>>
): Promise<void> => {
  const users = await findAllUsers();

  res.status(200).json(BaseResponseHandler.create(200, "Users found", users));
};

export const editUser = async (
  req: Request,
  res: Response<BaseResponse<IUser>>
): Promise<void> => {
  const userId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createBaseError(
      400,
      "Validation failed",
      errors.array().map((error) => error.msg)
    );
  }
  const { email } = req.body;

  const updatedUser = await updateUser(userId, email);

  res
    .status(200)
    .json(BaseResponseHandler.create(200, "User updated", updatedUser));
};
