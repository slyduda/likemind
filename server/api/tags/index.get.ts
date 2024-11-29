import { tagListByName } from "@/services";
import { object, optional, parse, string } from "valibot";

const querySchema = object({
  name: optional(string()),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) =>
    parse(querySchema, query),
  );

  return await tagListByName({ name: query.name ?? "", limit: 10, offset: 0 });
});
