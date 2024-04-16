import { parse } from "valibot";
import { userById } from "~/db/services";
import { userReadSchema } from "~/schemas/user.schema";

export default defineEventHandler(async (event) => {
  // Get the context from our middleware
  const id = event.context.user;
  if (!id) throw Error("You are not authenticated");

  const user = await userById({ id });

  if (!user) throw Error("Invalid JWT");

  const parsedUser = parse(userReadSchema, user);

  return parsedUser;
});
