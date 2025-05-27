import { BaseError } from "../interfaces/responses.interface";

export const createBaseError = (
  status: number,
  message: string,
  errors: string[]
): BaseError => {
  return {
    status,
    message,
    errors,
  };
};
