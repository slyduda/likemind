import { db } from "@/db";
import { activityTag, type ActivityTagInsert } from "@/db/models";

export const activityTagInsert = async (insert: ActivityTagInsert) => {
  const activityTags = await db.insert(activityTag).values(insert).returning();
  return activityTags[0];
};

export const activityTagInsertMany = async (insert: ActivityTagInsert[]) => {
  const activityTags = await db.insert(activityTag).values(insert).returning();
  return activityTags;
};
