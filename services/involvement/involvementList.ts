import { db } from "@/db";
import { involvement } from "@/db/models";
import { eq } from "drizzle-orm";

export const involvementList = async ({
  limit = 100,
  offset = 0,
  activityId,
}: {
  limit: number;
  offset: number;
  activityId?: string;
}) => {
  const query = db.select().from(involvement).limit(limit).offset(offset);

  // Conditionally add the `where` clause if `activityId` is provided
  if (activityId) {
    query.where(eq(involvement.activityId, activityId));
  }

  return await query;
};
