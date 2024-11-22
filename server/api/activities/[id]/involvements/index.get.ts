import { number, object, parse } from "valibot";
import { involvementList } from "~/services/involvement/involvementList";
import { involvementIdSchema } from "~/schemas/involvement.schema";

const getActivityByIdInvolvementsBodySchema = object({
  limit: number(),
  offset: number(),
  id: involvementIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getActivityByIdInvolvementsBodySchema, getRouterParams(event)),
  );
  return await involvementList({ activityId: params.id, ...params });
});
