import bcrypt from "bcrypt";

const CRYPT_SALT = +process.env.CRYPT_SALT || 10;

export async function encode(password: string): Promise<string> {
  return await bcrypt.hash(password, CRYPT_SALT);
}

export async function verify(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
