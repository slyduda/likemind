import { db } from "@/db";
import { activityEvidence, type ActivityEvidenceInsert } from "@/db/models";

export const activityEvidenceInsert = async (
  insert: ActivityEvidenceInsert,
) => {
  const activityEvidences = await db
    .insert(activityEvidence)
    .values(insert)
    .returning();
  return activityEvidences[0];
};

export const activityEvidenceInsertMany = async (
  insert: ActivityEvidenceInsert[],
) => {
  if (insert.length === 0) return [];
  const activityEvidences = await db
    .insert(activityEvidence)
    .values(insert)
    .returning();
  return activityEvidences;
};
