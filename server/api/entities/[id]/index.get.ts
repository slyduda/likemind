import { entityById } from "~/services";

import { object, parse } from "valibot";
import { entityIdSchema } from "~/schemas/entity.schema";

const getEntityByIdBodySchema = object({
  id: entityIdSchema,
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getEntityByIdBodySchema, getRouterParams(event)),
  );
  return await entityById({ id: params.id });
});
