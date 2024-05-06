import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { activityTag } from ".";

export const tag = pgTable("tag", {
  id: uuid("id").unique().defaultRandom(),
  name: text("name").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const tagRelations = relations(tag, ({ many }) => ({
  activityTags: many(activityTag),
}));

export type TagInsert = typeof tag.$inferInsert;
export type TagSelect = typeof tag.$inferSelect;
