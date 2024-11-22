import { db } from "@/db";
import { involvementReview, type InvolvementReviewInsert } from "@/db/models";

export const involvementReviewInsert = async (
  insert: InvolvementReviewInsert,
) => {
  const involvementReviews = await db
    .insert(involvementReview)
    .values(insert)
    .returning();
  return involvementReviews[0];
};

export const involvementReviewInsertMany = async (
  insert: InvolvementReviewInsert[],
) => {
  const involvementReviews = await db
    .insert(involvementReview)
    .values(insert)
    .returning();
  return involvementReviews;
};
