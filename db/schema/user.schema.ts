import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { involvementReview, membership, relationshipReview } from ".";
import { createInsertSchema } from "drizzle-valibot";
import { type Input } from 'valibot'

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  password: text("password").notNull(),
  isRegistered: boolean("is_registered").notNull().default(false),
});

export const userRelations = relations(user, ({ many }) => ({
  memberships: many(membership),
  relationshipReviews: many(relationshipReview),
  involvementReviews: many(involvementReview),
}));

export const userCreateSchema = createInsertSchema(user)
export type UserCreateType = typeof user.$inferInsert
export type userCreateValibotType = Input<typeof userCreateSchema>