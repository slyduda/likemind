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
} from "~/db/models";

export const clearTables = async () => {
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
  // await db.delete(user);

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
