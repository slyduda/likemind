import {
  array,
  object,
  optional,
  parse,
  pipe,
  string,
  transform,
  union,
} from "valibot";
import { activityList } from "~/services/activity/activityList";

const querySchema = object({
  tags: optional(
    pipe(
      union([array(string()), string()]),
      transform((input) => (Array.isArray(input) ? input : [input])),
    ),
    [],
  ),
  entities: optional(
    pipe(
      union([array(string()), string()]),
      transform((input) => (Array.isArray(input) ? input : [input])),
    ),
    [],
  ),
  description: optional(
    pipe(
      union([array(string()), string()]),
      transform((input) => (Array.isArray(input) ? input.join("") : input)),
    ),
    [],
  ),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (query) => {
    return parse(querySchema, query);
  });

  return await activityList({
    tags: query.tags,
    entities: query.entities,
    description: query.description,
    limit: 100,
    offset: 0,
  });
});
