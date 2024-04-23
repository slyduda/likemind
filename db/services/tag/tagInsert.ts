import { db } from "@/db";
import { type TagInsert, tag } from "@/db/models";

export const tagInsert = async (insert: TagInsert) => {
  const tags = await db.insert(tag).values(insert).returning();
  return tags[0];
};
