import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { activityTag, evidence, involvement } from ".";

export const activity = pgTable("activity", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description").notNull(),
  startedAt: date("started_at").notNull(),
  endedAt: date("ended_at"),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const activityRelations = relations(activity, ({ many }) => ({
  activityTags: many(activityTag),
  involvements: many(involvement),
  evidences: many(evidence),
}));
