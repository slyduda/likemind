import { db } from "@/db";
import { type EntityInsert, entity } from "@/db/models";

export const entityInsert = async (insert: EntityInsert) => {
  const entities = await db.insert(entity).values(insert).returning();
  return entities[0];
};

export const entityInsertMany = async (insert: EntityInsert[]) => {
  if (insert.length === 0) return [];
  const entities = await db.insert(entity).values(insert).returning();
  return entities;
};
