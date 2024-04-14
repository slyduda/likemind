import { hashSync } from "bcrypt";

// TODO: Find a way to do this asynchronously in our Valibot schema transformer
export const hashPassword = (password: string): string => {
  const hashedPassword = hashSync(password, "secret");
  return hashedPassword;
};
