import { eq } from "drizzle-orm";
import { db } from "~/db";
import { entity, involvement, activity } from "~/db/models";

export const activityByEntity = async ({ entityId }: { entityId: string }) => {
  const activities = await db
    .select()
    .from(activity)
    .innerJoin(involvement, eq(activity.id, involvement.activityId))
    .innerJoin(entity, eq(involvement.entityId, entity.id))
    .where(eq(entity.id, entityId));

  return activities;
};
