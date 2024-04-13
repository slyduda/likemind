import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relationship } from "./relationship.schema";
import { entity } from "./entity.schema";
import { relations } from "drizzle-orm";

export const relationshipArc = pgTable("relationship_arc", {
  id: uuid("id").primaryKey().defaultRandom(),
  relationshipId: uuid("relationship_id")
    .notNull()
    .references(() => relationship.id),
  startEntityId: uuid("start_entity_id")
    .notNull()
    .references(() => entity.id),
  endEntityId: uuid("end_entity_id")
    .notNull()
    .references(() => entity.id),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const relationshipArcRelations = relations(relationshipArc, ({ one }) => ({
  relationship: one(relationship, {
    fields: [relationshipArc.relationshipId],
    references: [relationship.id]
  }),
  startEntities: one(entity, {
    fields: [relationshipArc.startEntityId],
    references: [entity.id],
    relationName: "relationship_arc_starts"
  }),
  endEntities: one(entity, {
    fields: [relationshipArc.endEntityId],
    references: [entity.id],
    relationName: "relationship_arc_ends"
  })
}))