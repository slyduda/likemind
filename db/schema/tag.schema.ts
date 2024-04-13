import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { activityTag } from ".";

export const tag = pgTable("tag", {
  id: uuid("id").unique().defaultRandom(),
  name: text("name").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tagRelations = relations(tag, ({ many }) => ({
  activityTags: many(activityTag),
}));
