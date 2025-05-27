import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../interfaces/jwtpayload.interface";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload;
    }
  }
}

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: true, message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.SECRET_KEY;
  if (!secret) throw new Error("SECRET_KEY is not defined");

  try {
    const verified = jwt.verify(token, secret) as JwtPayload;
    req.user = verified;
    next();
  } catch {
    res.status(401).json({ error: true, message: "Invalid token" });
  }
};
