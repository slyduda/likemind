import { object, optional, parse, pipe, string, transform } from "valibot";
import { entityListByName } from "~/services";

const querySchema = object({
  name: optional(string()),
  limit: pipe(
    optional(string(), "10"),
    transform((input) => Number(input)),
  ),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    parse(querySchema, query),
  );

  return await entityListByName({
    name: query.name,
    limit: query.limit,
    offset: 0,
  });
});
