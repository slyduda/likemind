import { optional, parse } from "valibot";
import { loadDemo, userById } from "~/db/services";
import { DemoLoadServiceConstants, demoSchema } from "~/schemas/demo.schema";

const postDataDemoBodySchema = optional(demoSchema, {
  entityCount: DemoLoadServiceConstants.entityCount.default,
  activityCount: DemoLoadServiceConstants.activityCount.default,
  tagCount: DemoLoadServiceConstants.tagCount.default,
  relationshipCount: DemoLoadServiceConstants.relationshipCount.default,
  userCount: DemoLoadServiceConstants.userCount.default,
});

export default defineEventHandler<
  { body: typeof postDataDemoBodySchema },
  Promise<void>
>(async (event) => {
  // Get the user id from the context from our middleware
  const userId = event.context.user;
  if (!userId) throw Error("You are not authenticated");

  const user = await userById({ id: userId });
  if (!user) throw Error("Account does not exist");
  if (!user.isAdmin)
    throw Error("Account does not have sufficient permissions");

  const body = await readValidatedBody(event, async () =>
    parse(postDataDemoBodySchema, await readBody(event)),
  );

  await loadDemo(body);
  return;
});
