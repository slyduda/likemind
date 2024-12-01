import { suggestDescription } from "@/services";
import { parse } from "valibot";
import { activitySuggestionSchema } from "~/schemas/activitySuggestion.schema";

const bodySchema = activitySuggestionSchema;

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (query) => {
    return parse(bodySchema, query);
  });

  console.log(body.sources);

  const result = await suggestDescription(body.sources);
  console.log(result);
  return result;
  // if (body.description) {
  //   const result = await suggestDescriptionAdditions(
  //     body.sources,
  //     body.description,
  //   );
  //   return result;
  // }

  // const result = await suggestDescription(body.sources);
  // return result;
});
