import {
  UserCreateInputSchema,
  UserReadSchema,
  userCreateSchema,
} from "@/schemas/user.schema";
import { parse } from "valibot";
import { userInsert } from "@/db/services";

export default defineEventHandler<
  { body: UserCreateInputSchema },
  Promise<UserReadSchema>
>(async (event) => {
  const body = await readBody(event);

  // Parse and transform the body
  const user = parse(userCreateSchema, body);

  // Add the user to the DB
  const newUser = await userInsert(user);
  if (!newUser) throw Error("Error creating the user");

  return newUser;
});
