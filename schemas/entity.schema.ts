import { object, string, transform, type Input, type Output } from "valibot";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { entity } from "@/db/models";

// DB Schemas
export const entityInsertSchema = createInsertSchema(entity);
export const entitySelectSchema = createSelectSchema(entity);

// Primitives
export const entityIdSchema = string();
export const entityNameSchema = string();

// Create
export const entityCreateSchema = transform(
  object({
    name: entityNameSchema,
  }),
  (input) => input,
);
export type EntityCreateInputSchema = Input<typeof entityCreateSchema>;
export type EntityCreateOutputSchema = Output<typeof entityCreateSchema>;

// Read
export const entityReadSchema = object({
  id: entityIdSchema,
  name: entityNameSchema,
});
export type EntityReadSchema = Output<typeof entityReadSchema>;
