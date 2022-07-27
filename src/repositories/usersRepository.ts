import { db } from "../application/database";
import { User } from "@prisma/client";
import { IUserMapped } from "../interfaces/IUserMapped";

export async function getAll(): Promise<User[]> {
  return await db.user.findMany({});
}

export async function getAllMapped(): Promise<IUserMapped[]> {
  return await db.user.findMany({
    select: {
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getById(id: number): Promise<User> {
  return await db.user.findFirst({
    where: {
      id,
    },
  });
}

export async function getByIdMapped(id: number): Promise<IUserMapped> {
  return await db.user.findFirst({
    where: {
      id,
    },
    select: {
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getByEmail(email: string): Promise<User> {
  return await db.user.findFirst({
    where: {
      email,
    },
  });
}

export async function update({
  id,
  name,
  email,
  password,
  updatedAt,
}: User): Promise<void> {
  await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password,
      updatedAt,
    },
  });
}

export async function create({ name, email, password }: User): Promise<void> {
  await db.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

export async function deleteById(id: number): Promise<void> {
  await db.user.delete({
    where: {
      id,
    },
  });
}
