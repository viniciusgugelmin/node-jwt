import { User } from "@prisma/client";
import joi from "joi";
import { validationHandler } from "../handlers/validationHandler";

export function validateLoginSchema({ email, password }: User): void {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
  });

  validationHandler(schema, { email, password });
}
