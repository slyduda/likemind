import { array, object, parse } from "valibot";
import { entityComplexByIds } from "~/db/services/entity/entityBy";
import { entityIdSchema } from "~/schemas/entity.schema";

const getEntitiesEntitiesSchema = object({
  ids: array(entityIdSchema),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, async () =>
    parse(getEntitiesEntitiesSchema, await readBody(event)),
  );
  const payload = await entityComplexByIds({ ids: body.ids });
  return payload;
});
