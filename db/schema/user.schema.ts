import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { involvementReview, membership, relationshipReview } from ".";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  memberships: many(membership),
  relationshipReviews: many(relationshipReview),
  involvementReviews: many(involvementReview)
}));
