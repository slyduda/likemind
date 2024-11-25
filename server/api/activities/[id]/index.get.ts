import { object, parse } from "valibot";
import { activityByIdComplex } from "@/services";
import { activityIdSchema } from "@/schemas/activity.schema";

const bodySchema = object({
  id: activityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(bodySchema, getRouterParams(event)),
  );
  return await activityByIdComplex({ id: params.id });
});
