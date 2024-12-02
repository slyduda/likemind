import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  entity,
  involvement,
  activity,
  evidence,
  activityTag,
  activityEvidence,
  activityReview,
  type EvidenceSelect,
  type ActivityReviewSelect,
} from "@/db/models";

export const activityById = async ({ id }: { id: string }) => {
  const activities = await db
    .select()
    .from(activity)
    .where(eq(activity.id, id));

  return activities.length ? activities[0] : null;
};

export const activityByIdComplex = async ({ id }: { id: string }) => {
  const activities = await db
    .select({
      id: activity.id,
      description: activity.description,
      startedAt: activity.startedAt,
      endedAt: activity.endedAt,
      createdAt: activity.createdAt,
      isFake: activity.isFake,
      tags: sql<string[]>`
      COALESCE(
        array_agg(distinct activity_tag.tag_name) FILTER (WHERE activity_tag.tag_name IS NOT NULL), 
        ARRAY[]::text[]
      ) as tags`,
      entities: sql<string[]>`
      COALESCE(
        array_agg(distinct entity.name) FILTER (WHERE entity.name IS NOT NULL), 
        ARRAY[]::text[]
      ) as entities`,
      evidences: sql<EvidenceSelect[]>`
      COALESCE(
        array_agg(distinct jsonb_build_object(
          'id', evidence.id,
          'description', evidence.description,
          'source', evidence.source,
          'createdAt', evidence.created_at,
          'isFake', evidence.is_fake
        )) FILTER (WHERE evidence.id IS NOT NULL), 
        ARRAY[]::jsonb[]
      ) as evidences`,
      reviews: sql<ActivityReviewSelect[]>`
      COALESCE(
        array_agg(distinct jsonb_build_object(
          'id', activity_review.id,
          'importance', activity_review.importance,
          'activityId', activity_review.activity_id,
          'userId', activity_review.user_id,
          'createdAt', activity_review.created_at,
          'isFake', activity_review.is_fake
        )) FILTER (WHERE activity_review.id IS NOT NULL), 
        ARRAY[]::jsonb[]
      ) as reviews`,
    })
    .from(activity)
    .leftJoin(activityTag, eq(activityTag.activityId, activity.id))
    .leftJoin(involvement, eq(involvement.activityId, activity.id))
    .leftJoin(entity, eq(entity.id, involvement.entityId))
    .leftJoin(activityEvidence, eq(activityEvidence.activityId, activity.id))
    .leftJoin(evidence, eq(evidence.id, activityEvidence.evidenceId))
    .leftJoin(activityReview, eq(activityReview.activityId, activity.id))
    .where(eq(activity.id, id))
    .groupBy(activity.id);

  if (activities.length) {
    console.log(activities);
    const queriedActivity = {
      ...activities[0],
      reviewCount: activities[0].reviews.length,
      importance:
        activities[0].reviews.reduce(
          (sum, review) => sum + (review.importance || 0),
          0,
        ) / activities[0].reviews.length,
    };

    return queriedActivity;
  }
  return null;
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
