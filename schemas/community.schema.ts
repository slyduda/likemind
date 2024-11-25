import { object, string, type InferInput, type InferOutput } from "valibot";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { community } from "@/db/models";

// DB Schemas
export const communityInsertSchema = createInsertSchema(community);
export const communitySelectSchema = createSelectSchema(community);

// Primitives
export const communityIdSchema = string();
export const communityNameSchema = string();

// Create
export const communityCreateSchema = object({
  name: communityNameSchema,
});
export type CommunityCreateInputSchema = InferInput<
  typeof communityCreateSchema
>;
export type CommunityCreateOutputSchema = InferOutput<
  typeof communityCreateSchema
>;

// Read
export const communityReadSchema = object({
  id: communityIdSchema,
  name: communityNameSchema,
});
export type CommunityReadSchema = InferOutput<typeof communityReadSchema>;
