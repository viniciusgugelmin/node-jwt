import jwt from "jsonwebtoken";
import { AppException } from "../exceptions/AppException";

const SECRET = process.env.TOKEN_SECRET || "secret";
const EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "1d";

interface ITokenPayload {
  id: number;
}

export function encode(payload: ITokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function decode(token: string): ITokenPayload {
  try {
    return jwt.verify(token, SECRET) as ITokenPayload;
  } catch (error) {
    throw new AppException("Invalid token", 401);
  }
}
