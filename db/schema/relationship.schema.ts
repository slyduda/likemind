import { relations } from "drizzle-orm";
import { date, pgTable, uuid } from "drizzle-orm/pg-core";
import { relationshipArc, relationshipEvidence, relationshipReview } from ".";

export const relationship = pgTable("relationship", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const relationshipRelations = relations(relationship, ({ many }) => ({
  relationshipEvidences: many(relationshipEvidence),
  relationshipArcs: many(relationshipArc),
  relationshipReviews: many(relationshipReview),
}));
