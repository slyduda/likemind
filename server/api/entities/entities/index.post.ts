import { array, object, parse } from "valibot";
import { entityComplexByIds } from "~/services/entity/entityBy";
import { entityIdSchema } from "~/schemas/entity.schema";

const bodySchema = object({
  ids: array(entityIdSchema),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    parse(bodySchema, body),
  );
  const payload = await entityComplexByIds({ ids: body.ids });

  return payload;
});
