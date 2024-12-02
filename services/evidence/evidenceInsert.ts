import { db } from "@/db";
import { evidence, type EvidenceInsert } from "@/db/models";

export const evidenceInsert = async (insert: EvidenceInsert) => {
  const involvments = await db.insert(evidence).values(insert).returning();
  return involvments[0];
};

export const evidenceInsertMany = async (insert: EvidenceInsert[]) => {
  if (insert.length === 0) return [];
  const involvments = await db.insert(evidence).values(insert).returning();
  return involvments;
};
