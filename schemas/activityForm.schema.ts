import {
  array,
  check,
  checkItems,
  date,
  intersect,
  maxLength,
  maxValue,
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
  optional,
  uuid,
} from "valibot";

export const activityFormSourceIdTypeSchema = pipe(string(), uuid());

export const activityFormSourceUrlTypeSchema = pipe(string(), url());

export const activityFormSourceDescriptionMaxLength = 200;
export const activityFormSourceDescriptionTypeSchema = string();
export const activityFormSourceDescriptionSchema = pipe(
  activityFormSourceDescriptionTypeSchema,
  maxLength(activityFormSourceDescriptionMaxLength),
);

export const activityFormSourceSchema = object({
  id: activityFormSourceIdTypeSchema,
  url: activityFormSourceUrlTypeSchema,
  description: optional(activityFormSourceDescriptionSchema),
  title: optional(string()),
  article: optional(string()),
});

export const activityFormSourcesMinCount = 1;
export const activityFormSourcesMaxCount = 3;
export const activityFormSourcesTypeSchema = array(
  pipe(activityFormSourceSchema),
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
    (item, index, array) => array.indexOf(item) === index,
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

export const activityFormTagTypeSchema = string();
export const activityFormTagNonEmptySchema = pipe(
  activityFormTagTypeSchema,
  nonEmpty(),
);
export const activityFormTagToLowerCaseSchema = pipe(
  activityFormTagTypeSchema,
  toLowerCase(),
);
export const activityFormTagLowerCaseAlphabetSchema = pipe(
  activityFormTagTypeSchema,
  regex(
    /^[a-z]+$/,
    "Input must contain only lowercase alphabetic characters (a-z)",
  ),
);
export const activityFormTagSchema = pipe(
  activityFormTagTypeSchema,
  activityFormTagNonEmptySchema,
  activityFormTagToLowerCaseSchema,
  activityFormTagLowerCaseAlphabetSchema,
);
export const activityFormTagsMaxLength = 5;
export const activityFormTagsTypeSchema = array(activityFormTagTypeSchema);
export const activityFormTagsMaxLengthSchema = pipe(
  activityFormTagsTypeSchema,
  maxLength(activityFormTagsMaxLength),
);
export const activityFormTagsSchema = pipe(
  activityFormTagsTypeSchema,
  activityFormTagsMaxLengthSchema,
);

export const activityFormEntityTypeSchema = string();
export const activityFormEntitySchema = pipe(activityFormEntityTypeSchema);

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

export const activityFormCurrentDate = new Date();
export const activityFormStartedAtTypeSchema = date();
export const activityFormStartedAtBeforeNowSchema = pipe(
  activityFormStartedAtTypeSchema,
  maxValue(activityFormCurrentDate),
);
export const activityFormStartedAtSchema = pipe(
  activityFormStartedAtTypeSchema,
  activityFormStartedAtBeforeNowSchema,
);

export const activityFormEndedAtTypeSchema = nullable(date());
export const activityFormEndedAtBeforeNowIfDefinedSchema = pipe(
  activityFormEndedAtTypeSchema,
  check(
    (input) => input === null || input <= activityFormCurrentDate,
    "End date must be on or before the current date",
  ),
);
export const activityFormEndedAtSchema = pipe(
  activityFormEndedAtTypeSchema,
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

export type ActivityFormSourceType = InferOutput<
  typeof activityFormSourceSchema
>;
export type ActivityFormType = InferOutput<typeof activityFormSchema>;
