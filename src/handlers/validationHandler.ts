import joi from "joi";
import { AppException } from "../exceptions/AppException";

export function validationHandler(
  schema: joi.ObjectSchema,
  dataToValidate: any
) {
  const { error } = schema.validate(dataToValidate, {
    abortEarly: false,
  });

  if (error) {
    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message.replace(/['"]+/g, "");
    }

    throw new AppException("Invalid data was sent", 422, errors);
  }
}
