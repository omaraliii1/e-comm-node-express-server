import { BaseResponse } from "interfaces/responses.interface";

export class BaseResponseHandler {
  public static create<T>(
    status: number,
    message: string,
    data: T
  ): BaseResponse<T> {
    return {
      status,
      message,
      data,
    };
  }
}
