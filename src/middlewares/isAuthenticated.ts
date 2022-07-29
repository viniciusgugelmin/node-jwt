import { Request, Response, NextFunction } from "express";
import { AppException } from "../exceptions/AppException";
import * as tokenProvider from "../providers/tokenProvider";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppException("You don't have permission", 401);
  }

  const [, token] = authorization.split(" ");

  const decodedToken = tokenProvider.decode(token);

  req.user = {
    id: decodedToken.id,
  };

  next();
}
