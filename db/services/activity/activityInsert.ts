import { db } from "@/db";
import { activity, type ActivityInsert } from "@/db/models";

export const activityInsert = async (insert: ActivityInsert) => {
  const activities = await db.insert(activity).values(insert).returning();
  return activities[0];
};

export const activityInsertMany = async (insert: ActivityInsert[]) => {
  const activities = await db.insert(activity).values(insert).returning();
  return activities;
};
