import { timestamp, pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { activity } from "./activity.schema";
import { tag } from "./tag.schema";
import { relations } from "drizzle-orm";

export const activityTag = pgTable(
  "activity_tag",
  {
    id: uuid("id").defaultRandom().unique(),
    activityId: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    tagId: uuid("entity_id")
      .notNull()
      .references(() => tag.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      pkWithCustomName: primaryKey({
        name: "key_id",
        columns: [table.activityId, table.tagId],
      }),
    };
  }
);

export const activityTagRelations = relations(activityTag, ({ one }) => ({
  tag: one(tag, {
    fields: [activityTag.tagId],
    references: [tag.id],
  }),
  activity: one(activity, {
    fields: [activityTag.activityId],
    references: [activity.id],
  }),
}));
