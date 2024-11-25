import { object, parse, string } from "valibot";
import { involvementListWithEvidences } from "@/services/involvement/involvementList";
import { involvementIdSchema } from "@/schemas/involvement.schema";

const paramsSchema = object({
  id: involvementIdSchema,
});

const querySchema = object({
  limit: string(),
  offset: string(),
});

export default eventHandler<{
  query: { id: typeof involvementIdSchema };
  params: { limit: string; offset: string };
}>(async (event) => {
  const params = await getValidatedRouterParams(event, (params) =>
    parse(paramsSchema, params),
  );
  const query = await getValidatedQuery(event, (query) =>
    parse(querySchema, query),
  );

  return await involvementListWithEvidences({
    activityId: params.id,
    limit: Number(query.limit),
    offset: Number(query.offset),
  });
});
