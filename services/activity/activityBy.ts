import { eq } from "drizzle-orm";
import { db } from "@/db";
import { entity, involvement, activity } from "@/db/models";

export const activityById = async ({ id }: { id: string }) => {
  const activities = await db
    .select()
    .from(activity)
    .where(eq(activity.id, id));

  return activities.length ? activities[0] : null;
};

export const activityByEntity = async ({ entityId }: { entityId: string }) => {
  const activities = await db
    .selectDistinctOn([activity.id], { activity })
    .from(activity)
    .innerJoin(involvement, eq(activity.id, involvement.activityId))
    .innerJoin(entity, eq(involvement.entityId, entity.id))
    .where(eq(entity.id, entityId));

  return activities.map((activities) => activities.activity);
};
