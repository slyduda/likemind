import { eq } from "drizzle-orm";
import { db } from "~/db";
import {
  involvementReview,
  relationshipReview,
  activityReview,
  relationshipEvidence,
  activityEvidence,
  evidence,
  activityTag,
  tag,
  community,
  membership,
  relationshipArc,
  relationship,
  involvement,
  activity,
  entity,
  user,
} from "~/db/models";

export const clearTables = async (options?: { fake?: boolean }) => {
  const { fake = true } = options ?? {};
  if (fake) {
    await trueClearTables();
  } else {
    await normalClearTables();
  }
  return;
};

const trueClearTables = async () => {
  await db
    .delete(relationshipReview)
    .where(eq(relationshipReview.isFake, true));
  await db.delete(involvementReview).where(eq(involvementReview.isFake, true));
  await db.delete(activityReview).where(eq(activityReview.isFake, true));

  // Delete all evidences
  await db
    .delete(relationshipEvidence)
    .where(eq(relationshipEvidence.isFake, true));
  await db.delete(activityEvidence).where(eq(activityEvidence.isFake, true));
  // await db.delete(involvementEvidence)
  await db.delete(evidence).where(eq(evidence.isFake, true));

  // Delete all subscriptions and memberships
  await db.delete(membership).where(eq(membership.isFake, true));
  // await db.delete(subscription)

  // Delete all communities
  // await db.delete(communityActivity)
  // await db.delete(communityTag)
  await db.delete(community).where(eq(community.isFake, true));

  // Delete all users
  await db.delete(user).where(eq(user.isFake, true));

  // Delete all tags
  await db.delete(activityTag).where(eq(activityTag.isFake, true));
  await db.delete(tag).where(eq(tag.isFake, true));

  // Delete all relationships
  await db.delete(relationshipArc).where(eq(relationshipArc.isFake, true));
  await db.delete(relationship).where(eq(relationship.isFake, true));

  // Delete all involvements
  await db.delete(involvement).where(eq(involvement.isFake, true));

  // Delete all activities
  await db.delete(activity).where(eq(activity.isFake, true));

  // Delete all entities
  await db.delete(entity).where(eq(entity.isFake, true));
};

const normalClearTables = async () => {
  // Delete all reviews
  await db.delete(relationshipReview);
  await db.delete(involvementReview);
  await db.delete(activityReview);

  // Delete all evidences
  await db.delete(relationshipEvidence);
  await db.delete(activityEvidence);
  // await db.delete(involvementEvidence)
  await db.delete(evidence);

  // Delete all subscriptions and memberships
  await db.delete(membership);
  // await db.delete(subscription)

  // Delete all communities
  // await db.delete(communityActivity)
  // await db.delete(communityTag)
  await db.delete(community);

  // Delete all users
  await db.delete(user);

  // Delete all tags
  await db.delete(activityTag);
  await db.delete(tag);

  // Delete all relationships
  await db.delete(relationshipArc);
  await db.delete(relationship);

  // Delete all involvements
  await db.delete(involvement);

  // Delete all activities
  await db.delete(activity);

  // Delete all entities
  await db.delete(entity);
};
