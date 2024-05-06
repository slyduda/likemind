import {
  timestamp,
  pgTable,
  smallint,
  unique,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import { relationship, user } from ".";
import { relations } from "drizzle-orm";

export const relationshipReview = pgTable(
  "relationship_review",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    significance: smallint("significance").notNull(),
    relationshipId: uuid("relationship_id")
      .notNull()
      .references(() => relationship.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isFake: boolean("is_fake").notNull().default(false),
  },
  (table) => {
    return {
      unq: unique().on(table.relationshipId, table.userId),
    };
  },
);

export const relationshipReviewRelations = relations(
  relationshipReview,
  ({ one }) => ({
    user: one(user, {
      fields: [relationshipReview.userId],
      references: [user.id],
    }),
    relationship: one(relationship, {
      fields: [relationshipReview.relationshipId],
      references: [relationship.id],
    }),
  }),
);

export type RelationshipReviewInsert = typeof relationshipReview.$inferInsert;
export type RelationshipReviewSelect = typeof relationshipReview.$inferSelect;
