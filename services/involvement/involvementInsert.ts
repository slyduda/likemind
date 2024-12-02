import { db } from "@/db";
import { involvement, type InvolvementInsert } from "@/db/models";

export const involvementInsert = async (insert: InvolvementInsert) => {
  const involvments = await db.insert(involvement).values(insert).returning();
  return involvments[0];
};

export const involvementInsertMany = async (insert: InvolvementInsert[]) => {
  if (insert.length === 0) return [];
  const involvments = await db.insert(involvement).values(insert).returning();
  return involvments;
};
