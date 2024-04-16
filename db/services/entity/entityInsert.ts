import { db } from "@/db";
import { type EntityInsert, entity } from "@/db/models";

export const entityInsert = async (insert: EntityInsert) => {
  const entities = await db.insert(entity).values(insert).returning();
  return entities.length ? entities[0] : null;
};
