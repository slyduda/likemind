import { db } from "@/db";
import { relationshipArc, type RelationshipArcInsert } from "@/db/models";

export const relationshipArcInsert = async (insert: RelationshipArcInsert) => {
  const relationshipArcs = await db
    .insert(relationshipArc)
    .values(insert)
    .returning();
  return relationshipArcs[0];
};

export const relationshipArcInsertMany = async (
  insert: RelationshipArcInsert[],
) => {
  if (insert.length === 0) return [];
  const relationshipArcs = await db
    .insert(relationshipArc)
    .values(insert)
    .returning();
  return relationshipArcs;
};
