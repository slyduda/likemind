import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { activity } from "./activity.schema";
import { entity } from ".";
import { relations } from "drizzle-orm";

export const involvement = pgTable("involvement", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  description: text("description").notNull(),
  activityId: uuid("activity_id")
    .notNull()
    .references(() => activity.id),
  entityId: uuid("entity_id")
    .notNull()
    .references(() => entity.id),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const involvementRelations = relations(involvement, ({ one }) => ({
  activity: one(activity, {
    fields: [involvement.activityId],
    references: [activity.id],
  }),
  entity: one(entity, {
    fields: [involvement.entityId],
    references: [entity.id],
  }),
}));
