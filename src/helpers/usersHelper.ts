import joi from "joi";
import * as modelsHelper from "./modelsHelper";
import { User } from "@prisma/client";
import { validationHandler } from "../handlers/validationHandler";
import * as usersRepository from "../repositories/usersRepository";
import { AppException } from "../exceptions/AppException";
import { IUserMapped } from "../interfaces/IUserMapped";

export const validateIdSchema = (id: number): void =>
  modelsHelper.validateId(id);

export function getUserMapped(user: User): IUserMapped {
  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function validateUpdateSchema({ name, email, password }: User): void {
  const schema = joi.object({
    name: joi.string().optional(),
    email: joi.string().email().optional(),
    password: joi.string().min(4).optional(),
  });

  validationHandler(schema, { name, email, password });
}

export function validateCreateSchema({ name, email, password }: User): void {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });

  validationHandler(schema, { name, email, password });
}

export async function validateEmailIsUnique(
  email: string,
  userId = null
): Promise<void> {
  const user = await usersRepository.getByEmail(email);

  if (user && user.id !== userId) {
    throw new AppException("Email already in use", 409);
  }
}
