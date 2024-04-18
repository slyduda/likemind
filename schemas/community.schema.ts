import { object, string, transform, type Input, type Output } from "valibot";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { community } from "@/db/models";

// DB Schemas
export const communityInsertSchema = createInsertSchema(community);
export const communitySelectSchema = createSelectSchema(community);

// Primitives
export const communityIdSchema = string();
export const communityNameSchema = string();

// Create
export const communityCreateSchema = transform(
  object({
    name: communityNameSchema,
  }),
  (input) => input,
);
export type CommunityCreateInputSchema = Input<typeof communityCreateSchema>;
export type CommunityCreateOutputSchema = Output<typeof communityCreateSchema>;

// Read
export const communityReadSchema = object({
  id: communityIdSchema,
  name: communityNameSchema,
});
export type CommunityReadSchema = Output<typeof communityReadSchema>;
