import { relations } from "drizzle-orm";
import { timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { relationshipArc, relationshipEvidence, relationshipReview } from ".";

export const relationship = pgTable("relationship", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const relationshipRelations = relations(relationship, ({ many }) => ({
  relationshipEvidences: many(relationshipEvidence),
  relationshipArcs: many(relationshipArc),
  relationshipReviews: many(relationshipReview),
}));

export type RelationshipInsert = typeof relationship.$inferInsert;
export type RelationshipSelect = typeof relationship.$inferSelect;
