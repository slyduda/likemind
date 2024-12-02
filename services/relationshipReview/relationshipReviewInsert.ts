import { db } from "@/db";
import { relationshipReview, type RelationshipReviewInsert } from "@/db/models";

export const relationshipReviewInsert = async (
  insert: RelationshipReviewInsert,
) => {
  const relationshipReviews = await db
    .insert(relationshipReview)
    .values(insert)
    .returning();
  return relationshipReviews[0];
};

export const relationshipReviewInsertMany = async (
  insert: RelationshipReviewInsert[],
) => {
  if (insert.length === 0) return [];
  const relationshipReviews = await db
    .insert(relationshipReview)
    .values(insert)
    .returning();
  return relationshipReviews;
};
