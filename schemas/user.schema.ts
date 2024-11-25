import {
  object,
  string,
  transformAsync,
  objectAsync,
  type InferInput,
  type InferOutput,
  pipeAsync,
} from "valibot";
import { hashPassword } from "@/utils";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { user } from "@/db/models";

// DB Schemas
export const userInsertSchema = createInsertSchema(user);
export const userSelectSchema = createSelectSchema(user);

// Primitives
export const userIdSchema = string();
export const userEmailSchema = string();
export const userHandleSchema = string();
export const userPasswordSchema = string();

export const userPasswordTransformer = pipeAsync(
  string(),
  transformAsync((input) => hashPassword(input)),
);

// Create
export const userCreateSchema = objectAsync({
  email: userEmailSchema,
  handle: userHandleSchema,
  password: userPasswordTransformer,
});
export type UserCreateInputSchema = InferInput<typeof userCreateSchema>;
export type UserCreateOutputSchema = InferOutput<typeof userCreateSchema>;

// Read
export const userReadSchema = object({
  id: userIdSchema,
  email: userEmailSchema,
  handle: userHandleSchema,
});
export type UserReadSchema = InferOutput<typeof userReadSchema>;
