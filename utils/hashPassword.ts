import { genSalt, hash } from "bcrypt";

// TODO: Find a way to do this asynchronously in our Valibot schema transformer
export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};
