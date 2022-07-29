import { AppException } from "../exceptions/AppException";
import { User } from "@prisma/client";
import * as usersRepository from "../repositories/usersRepository";
import * as cryptProvider from "../providers/cryptProvider";
import * as tokenProvider from "../providers/tokenProvider";
import * as authHelper from "../helpers/authHelper";
import * as usersHelper from "../helpers/usersHelper";
import { IUserMapped } from "../interfaces/IUserMapped";

interface ILoginResponse {
  user: IUserMapped;
  token: string;
}

export async function login({
  email,
  password,
}: User): Promise<ILoginResponse> {
  authHelper.validateLoginSchema({ email, password } as User);

  const user = await usersRepository.getByEmail(email);

  if (!user) {
    throw new AppException("Email or password invalid", 401);
  }

  const isValid = await cryptProvider.verify(password, user.password);

  if (!isValid) {
    throw new AppException("Email or password invalid", 401);
  }

  const token = tokenProvider.encode({ id: user.id });

  return {
    user: usersHelper.getUserMapped(user),
    token,
  };
}
