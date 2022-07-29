import { Request, Response } from "express";
import * as authService from "../services/authService";
import { responseHandler } from "../handlers/responseHandler";

export async function login(req: Request, res: Response) {
  const login = req.body;

  const authenticatedUser = await authService.login(login);

  res.json(
    responseHandler({
      message: "User logged in successfully",
      data: authenticatedUser,
    })
  );
}
