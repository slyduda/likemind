import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { membership } from ".";
import { relations } from "drizzle-orm";

export const community = pgTable("community", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const communityRelations = relations(community, ({ many }) => ({
  memberships: many(membership),
}));
