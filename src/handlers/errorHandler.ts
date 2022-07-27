import { Request, Response, NextFunction } from "express";
import { AppException } from "../exceptions/AppException";
import { logErrorHandler } from "./logErrorHandler";
import { responseHandler } from "./responseHandler";

export function errorHandler(
  err: AppException | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppException) {
    return res
      .status(err.statusCode)
      .json(
        responseHandler({
          message: err.message,
          status: err.statusCode,
          data: err.data,
        })
      );
  }

  logErrorHandler(err);

  res.status(500).json(
    responseHandler({
      message: "Something went wrong",
      status: 500,
    })
  );
}
