import {
  array,
  maxLength,
  minLength,
  object,
  optional,
  pipe,
  string,
} from "valibot";

export const activitySuggestionSourceMaxLength = 2000;
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
  maxLength(3),
);
export const activitySuggestionSourcesMinLengthSchema = pipe(
  activitySuggestionSourcesTypeSchema,
  minLength(1),
);
export const activitySuggestionSourcesSchema = pipe(
  activitySuggestionSourcesTypeSchema,
  activitySuggestionSourcesMaxLengthSchema,
);

export const activitySuggestionSchema = object({
  description: optional(string()),
  sources: activitySuggestionSourcesSchema,
});
