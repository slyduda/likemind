import { activityById } from "@/db/services";

import { object, parse } from "valibot";
import { activityIdSchema } from "~/schemas/activity.schema";

const getActivityByIdBodySchema = object({
  id: activityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getActivityByIdBodySchema, getRouterParams(event)),
  );
  return await activityById({ id: params.id });
});
