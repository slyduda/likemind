import { timestamp, pgTable, smallint, unique, uuid } from "drizzle-orm/pg-core";
import { activity } from "./activity.schema";
import { user } from "./user.schema";
import { relations } from "drizzle-orm";

export const activityReview = pgTable(
  "activity_review",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    importance: smallint("importance").notNull(),
    activityId: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      unq: unique().on(table.activityId, table.userId),
    };
  }
);

export const activityReviewRelations = relations(
  activityReview,
  ({ one }) => ({
    activity: one(activity, {
      fields: [activityReview.activityId],
      references: [activity.id],
    }),
    user: one(user, {
      fields: [activityReview.userId],
      references: [user.id],
    }),
  })
);
