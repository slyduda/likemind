import { testOpenAPI } from "@/services";
import { activitySuggestionSchema } from "~/schemas/activitySuggestion.schema";

const bodySchema = activitySuggestionSchema;

export default defineEventHandler(async (event) => {
  // const body = await readValidatedBody(event, (query) => {
  //   return parse(bodySchema, query);
  // });

  const result = await testOpenAPI();
  console.log(result.choices[0].message.content);
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
