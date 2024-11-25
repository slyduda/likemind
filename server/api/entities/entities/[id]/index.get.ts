import {
  pipe,
  object,
  optional,
  parse,
  transform,
  string,
  minValue,
  maxValue,
  InferInput,
} from "valibot";
import { entityComplexById } from "~/services/entity/entityBy";
import { entityIdSchema } from "~/schemas/entity.schema";

const bodySchema = object({
  id: entityIdSchema,
});
type Body = InferInput<typeof bodySchema>;

const querySchema = object({
  depth: pipe(
    optional(string(), "1"),
    transform((string) => Number(string)),
    minValue(1),
    maxValue(3),
  ),
});
type Query = InferInput<typeof querySchema>;

export default eventHandler<{ query: Query; body: Body }>(async (event) => {
  const params = await getValidatedRouterParams(event, (params) =>
    parse(bodySchema, params),
  );
  const query = await getValidatedQuery(event, (query) =>
    parse(querySchema, query),
  );
  // Get the single entity and its related entities
  const payload = await entityComplexById({
    id: params.id,
    depth: query.depth,
  });

  return payload;
});
