import { db } from "@/db";
import {
  activity,
  entity,
  evidence,
  involvement,
  involvementEvidence,
  involvementReview,
  type ActivitySelect,
  type EntitySelect,
  type EvidenceSelect,
} from "@/db/models";
import { desc, eq, sql } from "drizzle-orm";

export type InvolvementComplexRead = {
  id: string;
  description: string;
  createdAt: Date;
  isFake: boolean;
  activity: ActivitySelect;
  entity: EntitySelect;
  evidences: EvidenceSelect[];
  sentiment: number;
  impact: number;
};

export const involvementList = async ({
  limit = 100,
  offset = 0,
  activityId,
}: {
  limit: number;
  offset: number;
  activityId?: string;
}) => {
  const query = db
    .select()
    .from(involvement)
    .innerJoin(activity, eq(involvement.activityId, activity.id))
    .innerJoin(entity, eq(involvement.entityId, entity.id))
    .limit(limit)
    .offset(offset);

  // Conditionally add the `where` clause if `activityId` is provided
  if (activityId) {
    query.where(eq(involvement.activityId, activityId));
  }

  return await query;
};

export const involvementListWithEvidences = async ({
  limit = 100,
  offset = 0,
  activityId,
}: {
  limit: number;
  offset: number;
  activityId?: string;
}): Promise<InvolvementComplexRead[]> => {
  const query = db
    .select({
      id: involvement.id,
      description: involvement.description,
      createdAt: involvement.createdAt,
      isFake: involvement.isFake,
      activity: activity,
      entity: entity,
      evidences: sql<EvidenceSelect[]>`array_agg(jsonb_build_object(
        'id', evidence.id,
        'description', evidence.description,
        'source', evidence.source,
        'createdAt', evidence.created_at,
        'isFake', evidence.is_fake
      )) as evidences`,
      sentiment: sql<number>`avg(involvement_review.sentiment)::float as sentiment_avg`,
      impact: sql<number>`avg(involvement_review.impact)::float as impact_avg`,
    })
    .from(involvement)
    .innerJoin(activity, eq(involvement.activityId, activity.id))
    .innerJoin(entity, eq(involvement.entityId, entity.id))
    .leftJoin(
      involvementEvidence,
      eq(involvementEvidence.involvementId, involvement.id),
    )
    .leftJoin(evidence, eq(involvementEvidence.evidenceId, evidence.id))
    .leftJoin(
      involvementReview,
      eq(involvementReview.involvementId, involvement.id),
    )
    .groupBy(
      involvement.id,
      involvement.description,
      involvement.createdAt,
      activity.id,
      entity.id,
      involvementEvidence.id,
      evidence.id,
      involvementReview.impact,
    )
    .orderBy(desc(sql`impact`))
    .limit(limit)
    .offset(offset);

  // Conditionally add the `where` clause if `activityId` is provided
  if (activityId) {
    query.where(eq(involvement.activityId, activityId));
  }

  const involvements = await query;
  return involvements;
};
