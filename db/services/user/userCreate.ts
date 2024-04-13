import { db } from "~/db";
import { user } from "~/db/schema";

export type NewUser = typeof user.$inferInsert;
export type User = typeof user.$inferSelect;

export const userCreate = async (newUser: NewUser) => {
  const users = await db.insert(user).values(newUser).returning();
  return users ? users[0] : null;
};
