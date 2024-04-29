import {
  object,
  string,
  type Input,
  type Output,
  transformAsync,
  objectAsync,
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

export const userPasswordTransformer = transformAsync(string(), hashPassword);

// Create
export const userCreateSchema = transformAsync(
  objectAsync({
    email: userEmailSchema,
    handle: userHandleSchema,
    password: userPasswordTransformer,
  }),
  (input) => input,
);
export type UserCreateInputSchema = Input<typeof userCreateSchema>;
export type UserCreateOutputSchema = Output<typeof userCreateSchema>;

// Read
export const userReadSchema = object({
  id: userIdSchema,
  email: userEmailSchema,
  handle: userHandleSchema,
});
export type UserReadSchema = Output<typeof userReadSchema>;
