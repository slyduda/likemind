import { relations } from "drizzle-orm";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { involvement, relationshipArc } from ".";

export const entity = pgTable("entity", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
});

export const entityRelations = relations(entity, ({ many }) => ({
  involements: many(involvement),
  relationshipArcs: many(relationshipArc),
}));
