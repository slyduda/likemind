import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { activityEvidence, activityTag, involvement } from ".";

export const activity = pgTable("activity", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description").notNull(),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const activityRelations = relations(activity, ({ many }) => ({
  activityTags: many(activityTag),
  involvements: many(involvement),
  activityEvidences: many(activityEvidence),
}));

export type ActivityInsert = typeof activity.$inferInsert;
export type ActivitySelect = typeof activity.$inferSelect;
