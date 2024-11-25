import {
  object,
  string,
  date,
  nullable,
  type InferInput,
  type InferOutput,
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
export const activityCreateSchema = object({
  description: activityDescriptionSchema,
  startedAt: activityStartedAtSchema,
  endedAt: activityEndedAtSchema,
});
export type ActivityCreateInputSchema = InferInput<typeof activityCreateSchema>;
export type ActivityCreateOutputSchema = InferOutput<
  typeof activityCreateSchema
>;

// Read
export const activityReadSchema = object({
  id: activityIdSchema,
  description: activityDescriptionSchema,
  startedAt: activityStartedAtSchema,
  endedAt: activityEndedAtSchema,
});
export type ActivityReadSchema = InferOutput<typeof activityReadSchema>;
