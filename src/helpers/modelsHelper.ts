import joi from "joi";
import { validationHandler } from "../handlers/validationHandler";

export function validateId(id: number): void {
  const schema = joi.object({
    id: joi.number().required(),
  });

  validationHandler(schema, { id });
}
