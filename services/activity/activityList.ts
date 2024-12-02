import { db } from "@/db";
import {
  activity,
  activityTag,
  entity,
  involvement,
  tag,
  type EntitySelect,
  type TagSelect,
} from "@/db/models";
import { eq, inArray, and, desc, ilike, sql } from "drizzle-orm";

export const activityList = async ({
  description,
  tags = [],
  entities = [],
  limit = 100,
  offset = 0,
}: {
  description?: string;
  tags?: string[];
  entities?: string[];
  limit: number;
  offset: number;
}) => {
  // Base query with joins for tags and entities
  const query = db
    .select({
      id: activity.id,
      description: activity.description,
      startedAt: activity.startedAt,
      endedAt: activity.endedAt,
      createdAt: activity.createdAt,
      isFake: activity.isFake,
      tags: sql<TagSelect[]>`
      COALESCE(
        array_agg(distinct jsonb_build_object(
          'id', tag.id,
          'name', tag.name,
          'createdAt', tag.created_at,
          'isFake', tag.is_fake
        )) FILTER (WHERE tag.id IS NOT NULL), 
        ARRAY[]::jsonb[]
      ) as tags`,
      entities: sql<EntitySelect[]>`
      COALESCE(
        array_agg(distinct jsonb_build_object(
          'id', entity.id,
          'name', entity.name,
          'createdAt', entity.created_at,
          'isFake', entity.is_fake
        )) FILTER (WHERE entity.id IS NOT NULL), 
        ARRAY[]::jsonb[]
      ) as entities`,
    })
    .from(activity)
    .leftJoin(activityTag, eq(activity.id, activityTag.activityId))
    .leftJoin(tag, eq(activityTag.tagName, tag.name))
    .leftJoin(involvement, eq(activity.id, involvement.activityId))
    .leftJoin(entity, eq(involvement.entityId, entity.id))
    .groupBy(activity.id) // Grouping by activity ID for aggregation
    .limit(limit)
    .offset(offset)
    .orderBy(desc(activity.createdAt));

  // Create an array to hold conditions
  const conditions: any[] = [];

  // Add tag filter condition
  if (tags.length > 0) {
    const tagQuery = db
      .select({ activityId: activityTag.activityId })
      .from(activityTag)
      .where(inArray(activityTag.tagName, tags));

    conditions.push(inArray(activity.id, tagQuery));
  }

  // Add entity filter condition
  if (entities.length > 0) {
    const entityQuery = db
      .select({ activityId: involvement.activityId })
      .from(involvement)
      .innerJoin(entity, eq(involvement.entityId, entity.id)) // Join to `entity` table
      .where(inArray(entity.name, entities)); // Filter by entity names

    conditions.push(inArray(activity.id, entityQuery));
  }

  // Add description filter condition
  if (description) {
    conditions.push(ilike(activity.description, `%${description}%`));
  }

  // Apply combined conditions using `and`
  if (conditions.length > 0) {
    query.where(and(...conditions));
  }

  const activities = await query;
  return activities;
};
