import { optional, parse } from "valibot";
import { loadDemo } from "~/db/services";
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
  const body = await readValidatedBody(event, async () =>
    parse(postDataDemoBodySchema, await readBody(event)),
  );

  await loadDemo(body);
  return;
});
