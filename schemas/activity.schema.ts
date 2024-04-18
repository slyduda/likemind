import {
  object,
  string,
  transform,
  type Input,
  type Output,
  date,
  nullable,
} from "valibot";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { activity } from "@/db/models";

// DB Schemas
export const activityInsertSchema = createInsertSchema(activity);
export const activitySelectSchema = createSelectSchema(activity);

// Primitives
export const activityIdSchema = string();
export const activityDescriptionSchema = string();
export const activityStartedAtSchema = date();
export const activityEndedAtSchema = nullable(date());

// Create
export const activityCreateSchema = transform(
  object({
    description: activityDescriptionSchema,
    startedAt: activityStartedAtSchema,
    endedAt: activityEndedAtSchema,
  }),
  (input) => input,
);
export type ActivityCreateInputSchema = Input<typeof activityCreateSchema>;
export type ActivityCreateOutputSchema = Output<typeof activityCreateSchema>;

// Read
export const activityReadSchema = object({
  id: activityIdSchema,
  description: activityDescriptionSchema,
  startedAt: activityStartedAtSchema,
  endedAt: activityEndedAtSchema,
});
export type ActivityReadSchema = Output<typeof activityReadSchema>;
