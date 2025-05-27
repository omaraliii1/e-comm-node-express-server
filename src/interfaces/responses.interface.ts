import { ValidationError } from "express-validator";

export interface ErrorResponse {
  status?: number;
  success: boolean;
  message: string;
  error?: string;
  errors?: ValidationError[];
}

export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface BaseError {
  status: number;
  message: string;
  errors: string[];
}
