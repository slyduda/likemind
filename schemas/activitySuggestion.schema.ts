import { array, maxLength, object, optional, pipe, string } from "valibot";

export const activitySuggestionSourceMaxLength = 1000;
export const activitySuggestionSourceTypeSchema = string();
export const activitySuggestionSourceMaxLengthSchema = pipe(
  activitySuggestionSourceTypeSchema,
  maxLength(activitySuggestionSourceMaxLength),
);
export const activitySuggestionSourcesTypeSchema = array(
  activitySuggestionSourceTypeSchema,
);
export const activitySuggestionSourcesMaxLengthSchema = pipe(
  activitySuggestionSourcesTypeSchema,
  maxLength(5),
);
export const activitySuggestionSourcesSchema = pipe(
  activitySuggestionSourcesTypeSchema,
  activitySuggestionSourcesMaxLengthSchema,
);

export const activitySuggestionSchema = object({
  description: optional(string()),
  sources: activitySuggestionSourcesSchema,
});
