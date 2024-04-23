import { db } from "@/db";
import { involvement, type InvolvementInsert } from "@/db/models";

export const involvementInsert = async (insert: InvolvementInsert) => {
  const involvments = await db.insert(involvement).values(insert).returning();
  return involvments[0];
};
