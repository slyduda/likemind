import { db } from "@/db";
import { activityReview, type ActivityReviewInsert } from "@/db/models";

export const activityReviewInsert = async (insert: ActivityReviewInsert) => {
  const activityReviews = await db
    .insert(activityReview)
    .values(insert)
    .returning();
  return activityReviews[0];
};

export const activityReviewInsertMany = async (
  insert: ActivityReviewInsert[],
) => {
  if (insert.length === 0) return [];
  const activityReviews = await db
    .insert(activityReview)
    .values(insert)
    .returning();
  return activityReviews;
};
