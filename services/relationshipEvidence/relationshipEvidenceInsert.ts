import { db } from "@/db";
import {
  relationshipEvidence,
  type RelationshipEvidenceInsert,
} from "@/db/models";

export const relationshipEvidenceInsert = async (
  insert: RelationshipEvidenceInsert,
) => {
  const relationshipEvidences = await db
    .insert(relationshipEvidence)
    .values(insert)
    .returning();
  return relationshipEvidences[0];
};

export const relationshipEvidenceInsertMany = async (
  insert: RelationshipEvidenceInsert[],
) => {
  if (insert.length === 0) return [];
  const relationshipEvidences = await db
    .insert(relationshipEvidence)
    .values(insert)
    .returning();
  return relationshipEvidences;
};
