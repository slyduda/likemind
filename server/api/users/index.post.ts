import {
  UserCreateInputSchema,
  UserReadSchema,
  userCreateSchema,
  userReadSchema,
} from "@/schemas/user.schema";
import { parse, parseAsync } from "valibot";
import { userInsert } from "~/services";

export default defineEventHandler<
  { body: UserCreateInputSchema },
  Promise<UserReadSchema>
>(async (event) => {
  const body = await readBody(event);

  // Parse and transform the body
  const user = await parseAsync(userCreateSchema, body);

  // Add the user to the DB
  const newUser = await userInsert(user);
  if (!newUser) throw Error("Error creating the user");

  // Parse and return
  const userRead = parse(userReadSchema, newUser);
  return userRead;
});
