import { db } from "@/db";
import { activity } from "@/db/models";

export const activityList = async ({
  limit = 100,
  offset = 0,
}: {
  limit: number;
  offset: number;
}) => {
  return await db.select().from(activity).limit(limit).offset(offset);
};
