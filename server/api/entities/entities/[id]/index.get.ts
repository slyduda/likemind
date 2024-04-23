import { object, parse } from "valibot";
import { entityComplexById } from "~/db/services/entity/entityBy";
import { entityIdSchema } from "~/schemas/entity.schema";

const getEntityByIdSchema = object({
  id: entityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getEntityByIdSchema, event.context.params),
  );
  const payload = await entityComplexById({ id: params.id });
  return payload;
});
