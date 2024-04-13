import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const tag = pgTable("tag", {
  id: uuid("id").unique().defaultRandom(),
  name: text("name").primaryKey().notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const tagRelations = relations(tag, ({ many }) => ({
  activityTags: many(tag),
}));
