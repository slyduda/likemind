import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { membership } from ".";
import { relations } from "drizzle-orm";

export const community = pgTable("community", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const communityRelations = relations(community, ({ many }) => ({
  memberships: many(membership),
}));

export type CommunityInsert = typeof community.$inferInsert;
export type CommunitySelect = typeof community.$inferSelect;
