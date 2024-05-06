import {
  timestamp,
  pgTable,
  primaryKey,
  uuid,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { activity, tag } from ".";
import { relations } from "drizzle-orm";

export const activityTag = pgTable(
  "activity_tag",
  {
    id: uuid("id").defaultRandom().unique(),
    activityId: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    tagName: text("tag_name")
      .notNull()
      .references(() => tag.name),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isFake: boolean("is_fake").notNull().default(false),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: "key_id",
        columns: [table.activityId, table.tagName],
      }),
    };
  },
);

export const activityTagRelations = relations(activityTag, ({ one }) => ({
  tag: one(tag, {
    fields: [activityTag.tagName],
    references: [tag.name],
  }),
  activity: one(activity, {
    fields: [activityTag.activityId],
    references: [activity.id],
  }),
}));

export type ActivityTagInsert = typeof activityTag.$inferInsert;
export type ActivityTagSelect = typeof activityTag.$inferSelect;
