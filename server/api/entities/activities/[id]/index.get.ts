import { object, parse } from "valibot";
import { activityByEntity } from "~/services";
import { entityIdSchema } from "~/schemas/entity.schema";

const bodySchema = object({
  id: entityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, (params) =>
    parse(bodySchema, params),
  );

  // Get the single entity and its related entities
  const payload = await activityByEntity({
    entityId: params.id,
  });

  return payload;
});
