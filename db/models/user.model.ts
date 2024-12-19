import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { involvementReview, membership, relationshipReview } from ".";
import { subject } from "./subject.model";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull(),
  nativeSub: uuid("native_sub")
    .unique()
    .references(() => subject.id),
  supabaseSub: uuid("supabase_sub").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
