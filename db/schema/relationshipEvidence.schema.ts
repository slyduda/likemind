import { date, pgTable, uuid } from "drizzle-orm/pg-core";
import { relationship } from "./relationship.schema";
import { entity } from "./entity.schema";

export const relationshipEvidence = pgTable("relationship_evidence", {
    id: uuid("id").defaultRandom(),
    relationshipId: uuid("relationship_id").notNull().references(() => relationship.id),
    entityId: uuid("entity_id").notNull().references(() => entity.id),
    createdAt: date("created_at").notNull().defaultNow()
})