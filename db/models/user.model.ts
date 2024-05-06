import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { involvementReview, membership, relationshipReview } from ".";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  password: text("password").notNull(),
  isRegistered: boolean("is_registered").notNull().default(false),
  isAdmin: boolean("is_admin").notNull().default(false),
  isLocked: boolean("is_locked").notNull().default(false),
  isFake: boolean("is_fake").notNull().default(false),
});

export const userRelations = relations(user, ({ many }) => ({
  memberships: many(membership),
  relationshipReviews: many(relationshipReview),
  involvementReviews: many(involvementReview),
}));

export type UserInsert = typeof user.$inferInsert;
export type UserSelect = typeof user.$inferSelect;
