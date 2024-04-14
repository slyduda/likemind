import { db } from "@/db";
import { user } from "@/db/models";

export const userList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(user).limit(limit).offset(offset);
};
