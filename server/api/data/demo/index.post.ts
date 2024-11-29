import { optional, parse } from "valibot";
import { loadDemo, userById } from "@/services";
import { DemoLoadServiceConstants, demoSchema } from "~/schemas/demo.schema";

const bodySchema = optional(demoSchema, {
  entityCount: DemoLoadServiceConstants.entityCount.default,
  activityCount: DemoLoadServiceConstants.activityCount.default,
  tagCount: DemoLoadServiceConstants.tagCount.default,
  relationshipCount: DemoLoadServiceConstants.relationshipCount.default,
  userCount: DemoLoadServiceConstants.userCount.default,
});

type Body = typeof bodySchema;

export default eventHandler<{ body: Body }>(async (event) => {
  // Get the user id from the context from our middleware
  const userId = event.context.user;
  if (!userId) throw createError("You are not authenticated");

  const user = await userById({ id: userId });
  if (!user) throw createError("Account does not exist");
  if (!user.isAdmin)
    throw createError("Account does not have sufficient permissions");

  const body = await readValidatedBody(event, async () =>
    parse(bodySchema, await readBody(event)),
  );

  await loadDemo(body);
  return;
});
