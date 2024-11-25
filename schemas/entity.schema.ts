import { object, string, type InferInput, type InferOutput } from "valibot";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { entity } from "@/db/models";

// DB Schemas
export const entityInsertSchema = createInsertSchema(entity);
export const entitySelectSchema = createSelectSchema(entity);

// Primitives
export const entityIdSchema = string();
export const entityNameSchema = string();

// Create
export const entityCreateSchema = object({
  name: entityNameSchema,
});
export type EntityCreateInputSchema = InferInput<typeof entityCreateSchema>;
export type EntityCreateOutputSchema = InferOutput<typeof entityCreateSchema>;

// Read
export const entityReadSchema = object({
  id: entityIdSchema,
  name: entityNameSchema,
});
export type EntityReadSchema = InferOutput<typeof entityReadSchema>;
