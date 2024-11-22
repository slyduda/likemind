import { db } from "@/db";
import {
  involvementEvidence,
  type InvolvementEvidenceInsert,
} from "@/db/models";

export const involvementEvidenceInsert = async (
  insert: InvolvementEvidenceInsert,
) => {
  const involvementEvidences = await db
    .insert(involvementEvidence)
    .values(insert)
    .returning();
  return involvementEvidences[0];
};

export const involvementEvidenceInsertMany = async (
  insert: InvolvementEvidenceInsert[],
) => {
  const involvementEvidences = await db
    .insert(involvementEvidence)
    .values(insert)
    .returning();
  return involvementEvidences;
};
