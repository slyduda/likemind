import {
  coerce,
  number,
  object,
  optional,
  parse,
  toMaxValue,
  toMinValue,
} from "valibot";
import { entityComplexById } from "~/services/entity/entityBy";
import { entityIdSchema } from "~/schemas/entity.schema";

const getEntityByIdBodySchema = object({
  id: entityIdSchema,
});

const getEntityByIdQuerySchema = object({
  depth: optional(coerce(number([toMinValue(1), toMaxValue(3)]), Number), 1),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, () =>
    parse(getEntityByIdBodySchema, event.context.params),
  );
  const query = await getValidatedQuery(event, async () =>
    parse(getEntityByIdQuerySchema, await getQuery(event)),
  );
  // Get the single entity and its related entities
  const payload = await entityComplexById({
    id: params.id,
    depth: query.depth,
  });

  return payload;
});
