import { db } from "@/db";
import { activity, type ActivityInsert } from "@/db/models";

export const activityInsert = async (insert: ActivityInsert) => {
  const entities = await db.insert(activity).values(insert).returning();
  return entities.length ? entities[0] : null;
};
