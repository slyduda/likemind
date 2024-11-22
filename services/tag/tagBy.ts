import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { activity, activityTag, entity, involvement, tag } from "@/db/models";

export const tagByEntity = async ({ entityId }: { entityId: string }) => {
  const tags = await db
    .select({ tag, count: sql<number>`count(*)`.as("tag_count") })
    .from(tag)
    .innerJoin(activityTag, eq(tag.name, activityTag.tagName))
    .innerJoin(activity, eq(activityTag.activityId, activity.id))
    .innerJoin(involvement, eq(activity.id, involvement.activityId))
    .innerJoin(entity, eq(involvement.entityId, entity.id))
    .where(eq(entity.id, entityId))
    .groupBy(tag.name);

  return tags.map((tag) => {
    return { ...tag, count: Number(tag.count) };
  });
};
