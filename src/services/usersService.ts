import * as usersRepository from "../repositories/usersRepository";
import { IUserMapped } from "../interfaces/IUserMapped";
import { User } from "@prisma/client";
import { AppException } from "../exceptions/AppException";
import * as usersHelper from "../helpers/usersHelper";
import * as cryptProvider from "../providers/cryptProvider";

export async function getAll(): Promise<IUserMapped[]> {
  return await usersRepository.getAllMapped();
}

export async function getById(id: number): Promise<IUserMapped> {
  usersHelper.validateIdSchema(id);

  const user = await usersRepository.getByIdMapped(id);

  if (!user) {
    throw new AppException("User not found", 404);
  }

  return user;
}

export async function update({
  id,
  name,
  email,
  password,
}: User): Promise<void> {
  usersHelper.validateIdSchema(id);
  usersHelper.validateUpdateSchema({ name, email, password } as User);
  email && (await usersHelper.validateEmailIsUnique(email, id));

  const encryptedPassword = password && (await cryptProvider.encode(password));
  const updatedAt = new Date();

  await usersRepository.update({
    id,
    name,
    email,
    password: encryptedPassword,
    updatedAt,
  } as User);
}

export async function create({ name, email, password }: User): Promise<void> {
  usersHelper.validateCreateSchema({ name, email, password } as User);
  await usersHelper.validateEmailIsUnique(email);

  const encryptedPassword = await cryptProvider.encode(password);

  await usersRepository.create({
    name,
    email,
    password: encryptedPassword,
  } as User);
}

export async function deleteById(id: number): Promise<void> {
  usersHelper.validateIdSchema(id);
  const user = await usersRepository.getByIdMapped(id);

  if (!user) {
    throw new AppException("User not found", 404);
  }

  await usersRepository.deleteById(id);
}
