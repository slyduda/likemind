import { db } from "@/db";
import { type TagInsert, tag } from "@/db/models";

export const tagInsert = async (insert: TagInsert) => {
  const tags = await db.insert(tag).values(insert).returning();
  return tags[0];
};

export const tagInsertMany = async (insert: TagInsert[]) => {
  if (insert.length === 0) return [];
  const tags = await db.insert(tag).values(insert).returning();
  return tags;
};
