import { db } from "@/db";
import { user, type UserInsert } from "@/db/models";

export const userInsert = async (insert: UserInsert) => {
  const users = await db.insert(user).values(insert).returning();
  return users[0];
};

export const userInsertMany = async (insert: UserInsert[]) => {
  if (insert.length === 0) return [];
  const users = await db.insert(user).values(insert).returning();
  return users;
};
