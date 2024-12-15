import {
  UserCreateInputSchema,
  UserReadSchema,
  userCreateSchema,
  userReadSchema,
} from "@/schemas/user.schema";
import { parse, parseAsync } from "valibot";
import { userNativeSignup } from "~/services";

export default defineEventHandler<
  { body: UserCreateInputSchema },
  Promise<UserReadSchema>
>(async (event) => {
  const body = await readBody(event);

  // Parse and transform the body
  const { email, password, handle } = await parseAsync(userCreateSchema, body);

  // Add the user to the DB
  const newUser = await userNativeSignup({ email, password }, { handle });
  if (!newUser) throw createError("Error creating the user");

  // Parse and return
  const userRead = parse(userReadSchema, newUser);
  return userRead;
});
