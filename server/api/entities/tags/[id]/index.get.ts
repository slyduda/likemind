import { object, parse } from "valibot";
import { tagByEntity } from "~/db/services";
import { entityIdSchema } from "~/schemas/entity.schema";

const getEntityByIdBodySchema = object({
  id: entityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getEntityByIdBodySchema, event.context.params),
  );

  // Get the single entity and its related entities
  const payload = await tagByEntity({
    entityId: params.id,
  });

  return payload;
});
