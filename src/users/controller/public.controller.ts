import User from "../models/user.model";
import { Request, Response } from "express";
import { BaseResponse } from "interfaces/responses.interface";
import { IUser } from "../../users/interfaces/user.interface";
import { createBaseError } from "../../utils/baseErrorHandler";
import { BaseResponseHandler } from "../../utils/baseResponseHandler";

export const notAuth = (req: Request, res: Response): void => {
  res.status(200).json("Welcome to the Home Page!");
};

export const auth = async (
  req: Request,
  res: Response<BaseResponse<IUser>>
): Promise<void> => {
  const userId: string = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    throw createBaseError(404, "User not found", []);
  }

  res
    .status(200)
    .json(BaseResponseHandler.create(200, "Authenticated user", user));
};
