import { genSaltSync, hashSync } from "bcrypt";

// TODO: Find a way to do this asynchronously in our Valibot schema transformer
export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};
