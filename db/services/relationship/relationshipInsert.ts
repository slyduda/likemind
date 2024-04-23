import { db } from "@/db";
import { relationship, type RelationshipInsert } from "@/db/models";

export const relationshipInsert = async (insert: RelationshipInsert) => {
  const relationships = await db
    .insert(relationship)
    .values(insert)
    .returning();
  return relationships[0];
};
