import { db } from "@/db";
import { user, type UserInsert } from "@/db/models";

export const userInsert = async (insert: UserInsert) => {
  const users = await db.insert(user).values(insert).returning();
  return users[0];
};
