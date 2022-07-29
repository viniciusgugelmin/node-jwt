import { Request, Response } from "express";
import * as usersService from "../services/usersService";
import { responseHandler } from "../handlers/responseHandler";

export async function getAll(req: Request, res: Response) {
  const users = await usersService.getAll();

  res.json(
    responseHandler({
      message: "Users retrieved successfully",
      data: users,
    })
  );
}

export async function get(req: Request, res: Response) {
  const { id } = req.params;

  const user = await usersService.getById(+id);
  res.json(
    responseHandler({
      message: "User retrieved successfully",
      data: user,
    })
  );
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const user = req.body;

  await usersService.update({
    ...user,
    id: +(user.id ?? id),
  });

  res.json(
    responseHandler({
      message: "User updated successfully",
    })
  );
}

export async function create(req: Request, res: Response) {
  const user = req.body;

  await usersService.create({
    ...user,
  });

  res.json(
    responseHandler({
      message: "User created successfully",
      status: 201,
    })
  );
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;

  await usersService.deleteById(+id);

  res.json(
    responseHandler({
      message: "User deleted successfully",
    })
  );
}
