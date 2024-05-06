import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { entity, activity } from ".";
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
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
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

export type InvolvementInsert = typeof involvement.$inferInsert;
export type InvolvementSelect = typeof involvement.$inferSelect;
