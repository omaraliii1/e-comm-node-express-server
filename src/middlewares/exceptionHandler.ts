// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { BaseError } from "../interfaces/responses.interface";

const errorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || [];

  res.status(status).json({
    success: false,
    status,
    message,
    errors,
  });
};

export default errorHandler;
