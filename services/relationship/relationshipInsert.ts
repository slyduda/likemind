import { db } from "@/db";
import { relationship, type RelationshipInsert } from "@/db/models";

export const relationshipInsert = async (insert: RelationshipInsert) => {
  const relationships = await db
    .insert(relationship)
    .values(insert)
    .returning();
  return relationships[0];
};

export const relationshipInsertMany = async (insert: RelationshipInsert[]) => {
  if (insert.length === 0) return [];
  const relationships = await db
    .insert(relationship)
    .values(insert)
    .returning();
  return relationships;
};
