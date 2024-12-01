import {
  array,
  check,
  checkItems,
  date,
  intersect,
  maxLength,
  minLength,
  nonEmpty,
  nullable,
  object,
  pipe,
  regex,
  string,
  toLowerCase,
  url,
  type InferOutput,
  uuid,
  picklist,
  boolean,
  transform,
  union,
  number,
} from "valibot";

export function cleanUrl(url: string) {
  try {
    // Create a new URL object
    const urlObj = new URL(url);

    // Construct the cleaned URL without query parameters
    let cleanedUrl = urlObj.origin + urlObj.pathname;

    // Remove trailing slash if present (but preserve root `/`)
    if (cleanedUrl.endsWith("/") && cleanedUrl !== urlObj.origin + "/") {
      cleanedUrl = cleanedUrl.slice(0, -1);
    }

    return cleanedUrl;
  } catch (error) {
    // Handle invalid URLs gracefully
    console.error("Invalid URL:", error);
    return url; // Return the original string if it's not a valid URL
  }
}

export const activityFormSourceIdTypeSchema = pipe(string(), uuid());
export const activityFormSourceUrlTypeSchema = string();
export const activityFormSourceUrlSanitizeSchema = pipe(
  activityFormSourceUrlTypeSchema,
  transform((link) => cleanUrl(link)),
);
export const activityFormSourceUrlSchema = pipe(
  activityFormSourceUrlTypeSchema,
  url(),
  activityFormSourceUrlSanitizeSchema,
);

export const activityFormSourceDescriptionMaxLength = 200;
export const activityFormSourceDescriptionTypeSchema = string();
export const activityFormSourceDescriptionSchema = pipe(
  activityFormSourceDescriptionTypeSchema,
  maxLength(activityFormSourceDescriptionMaxLength),
);

export const activityFormSourceSchema = object({
  id: activityFormSourceIdTypeSchema,
  url: activityFormSourceUrlSchema,

  scraped: nullable(picklist(["loading", "success", "failed"])),
  parsed: nullable(boolean()),
  assisted: nullable(picklist(["loading", "success", "failed"])),
  suggestion: nullable(string()),

  description: nullable(activityFormSourceDescriptionSchema),
  title: nullable(string()),
  article: nullable(string()),
});

export const activityFormSourcesMinCount = 1;
export const activityFormSourcesMaxCount = 3;
export const activityFormSourcesTypeSchema = array(
  pipe(activityFormSourceSchema, activityFormSourceSchema),
);
export const activityFormSourcesMinLengthSchema = pipe(
  activityFormSourcesTypeSchema,
  minLength(
    activityFormSourcesMinCount,
    `At least ${activityFormSourcesMinCount} source(s) is required`,
  ),
);
export const activityFormSourcesMaxLengthSchema = pipe(
  activityFormSourcesTypeSchema,
  maxLength(
    activityFormSourcesMaxCount,
    `No more than ${activityFormSourcesMaxCount} source(s)`,
  ),
);
export const activityFormSourcesDuplicatesSchema = pipe(
  activityFormSourcesTypeSchema,
  checkItems(
    (item, index, array) => array.map((i) => i.url).indexOf(item.url) === index,
    "Duplicate items are not allowed.",
  ),
);
export const activityFormSourcesSchema = pipe(
  activityFormSourcesTypeSchema,
  activityFormSourcesMinLengthSchema,
  activityFormSourcesMaxLengthSchema,
  activityFormSourcesDuplicatesSchema,
);

export const activityFormDescriptionMinLength = 250;
export const activityFormDescriptionMaxLength = 5000;
export const activityFormDescriptionTypeSchema = string();
export const activityFormDescriptionMinLengthSchema = pipe(
  activityFormDescriptionTypeSchema,
  minLength(activityFormDescriptionMinLength),
);
export const activityFormDescriptionMaxLengthSchema = pipe(
  activityFormDescriptionTypeSchema,
  maxLength(activityFormDescriptionMaxLength),
);
export const activityFormDescriptionSchema = pipe(
  activityFormDescriptionTypeSchema,
  activityFormDescriptionMinLengthSchema,
  activityFormDescriptionMaxLengthSchema,
);

export const activityFormTagNameTypeSchema = string();
export const activityFormTagNonEmptySchema = pipe(
  activityFormTagNameTypeSchema,
  nonEmpty(),
);
export const activityFormTagToLowerCaseSchema = pipe(
  activityFormTagNameTypeSchema,
  toLowerCase(),
);
export const activityFormTagLowerCaseAlphabetSchema = pipe(
  activityFormTagNameTypeSchema,
  regex(
    /^[a-z]+$/,
    "Input must contain only lowercase alphabetic characters (a-z)",
  ),
);
export const activityFormTagNameSchema = pipe(
  activityFormTagNameTypeSchema,
  activityFormTagNonEmptySchema,
  activityFormTagToLowerCaseSchema,
  activityFormTagLowerCaseAlphabetSchema,
);

export const activityFormTagSchema = object({
  name: activityFormTagNameSchema,
  id: nullable(pipe(string(), uuid())),
});

export const activityFormTagsMaxLength = 5;
export const activityFormTagsTypeSchema = array(activityFormTagSchema);
export const activityFormTagsMaxLengthSchema = pipe(
  activityFormTagsTypeSchema,
  maxLength(activityFormTagsMaxLength),
);
export const activityFormTagsSchema = pipe(
  activityFormTagsTypeSchema,
  activityFormTagsMaxLengthSchema,
);

export const activityFormEntityNameTypeSchema = string();
export const activityFormEntityNameSchema = pipe(
  activityFormEntityNameTypeSchema,
  activityFormEntityNameTypeSchema,
);
export const activityFormEntityTypeSchema = object({
  name: activityFormEntityNameSchema,
  id: nullable(pipe(string(), uuid())),
});
export const activityFormEntitySchema = pipe(
  activityFormEntityTypeSchema,
  activityFormEntityTypeSchema,
);

export const activityFormEntitiesMaxLength = 10;
export const activityFormEntitiesTypeSchema = array(
  activityFormEntityTypeSchema,
);
export const activityFormEntitiesMaxLengthSchema = pipe(
  activityFormEntitiesTypeSchema,
  maxLength(activityFormEntitiesMaxLength),
);
export const activityFormEntitiesSchema = pipe(
  activityFormEntitiesTypeSchema,
  activityFormEntitiesMaxLengthSchema,
);

export const activityFormStartedAtTypeSchema = date();
export const activityFormStartedAtCoercedTypeSchema = pipe(
  union([string(), number(), date()]),
  transform((input) => new Date(input)),
  activityFormStartedAtTypeSchema,
);
export const activityFormStartedAtBeforeNowSchema = pipe(
  activityFormStartedAtTypeSchema,
  check(
    (input) => input <= new Date(),
    "Start date must be on or before the current date",
  ),
);
export const activityFormStartedAtSchema = pipe(
  activityFormStartedAtCoercedTypeSchema,
  activityFormStartedAtBeforeNowSchema,
);

export const activityFormEndedAtTypeSchema = nullable(date());
export const activityFormEndedAtCoercedTypeSchema = pipe(
  nullable(union([string(), number(), date()])),
  transform((input) => (input !== null ? new Date(input) : null)),
  activityFormEndedAtTypeSchema,
);
export const activityFormEndedAtBeforeNowIfDefinedSchema = pipe(
  activityFormEndedAtTypeSchema,
  check(
    (input) => input === null || input <= new Date(),
    "End date must be on or before the current date",
  ),
);
export const activityFormEndedAtSchema = pipe(
  activityFormEndedAtCoercedTypeSchema,
  activityFormEndedAtBeforeNowIfDefinedSchema,
);

export const activityFormDatesTypeSchema = object({
  startedAt: activityFormStartedAtTypeSchema,
  endedAt: activityFormEndedAtTypeSchema,
});

export const activityFormDatesEndedAfterStartedSchema = pipe(
  activityFormDatesTypeSchema,
  check((input) => {
    if (input.endedAt && input.startedAt > input.endedAt) {
      return false;
    }
    return true;
  }, "End date must be on or after the start date"),
);

export const activityFormPageOneSchema = object({
  sources: activityFormSourcesSchema,
  description: activityFormDescriptionSchema,
});

export const activityFormPageTwoSchema = object({
  tags: activityFormTagsSchema,
  entities: activityFormEntitiesSchema,
});

export const activityFormPageThreeSchema = object({
  startedAt: activityFormStartedAtSchema,
  endedAt: activityFormEndedAtSchema,
});

export const activityFormSchema = intersect([
  activityFormPageOneSchema,
  activityFormPageTwoSchema,
  activityFormPageThreeSchema,
]);

export type ActivityFormTagType = InferOutput<typeof activityFormTagSchema>;
export type ActivityFormEntityType = InferOutput<
  typeof activityFormEntitySchema
>;
export type ActivityFormSourceType = InferOutput<
  typeof activityFormSourceSchema
>;
export type ActivityFormType = InferOutput<typeof activityFormSchema>;
