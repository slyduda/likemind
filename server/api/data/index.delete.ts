import { boolean, object, optional, parse } from "valibot";
import { clearTables, userById } from "~/services";

const clearSchema = object({
  fake: optional(boolean(), true),
});

const deleteDataClearBodySchema = optional(clearSchema, {
  fake: true,
});

export default defineEventHandler<
  { body: typeof deleteDataClearBodySchema },
  Promise<void>
>(async (event) => {
  // Get the user id from the context from our middleware
  const userId = event.context.user;
  if (!userId) throw createError("You are not authenticated");

  const user = await userById({ id: userId });
  if (!user) throw createError("Account does not exist");
  if (!user.isAdmin)
    throw createError("Account does not have sufficient permissions");

  const body = await readValidatedBody(event, async () =>
    parse(deleteDataClearBodySchema, await readBody(event)),
  );
  await clearTables({ fake: body.fake });
  return;
});
