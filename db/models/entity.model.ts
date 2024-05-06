import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { involvement, relationshipArc } from ".";

export const entity = pgTable("entity", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const entityRelations = relations(entity, ({ many }) => ({
  involvements: many(involvement),
  relationshipArcStarts: many(relationshipArc, {
    relationName: "relationship_arc_starts",
  }),
  relationshipArcEnds: many(relationshipArc, {
    relationName: "relationship_arc_ends",
  }),
}));

export type EntityInsert = typeof entity.$inferInsert;
export type EntitySelect = typeof entity.$inferSelect;
