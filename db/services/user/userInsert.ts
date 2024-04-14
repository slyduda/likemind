import { db } from "@/db";
import { user, type UserInsert } from "@/db/models";


export const userInsert = async (userInsert: UserInsert) => {
  const users = await db.insert(user).values(userInsert).returning();
  return users ? users[0] : null;
};
