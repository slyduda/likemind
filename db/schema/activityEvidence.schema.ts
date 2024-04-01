import { date, pgTable, uuid } from "drizzle-orm/pg-core";
import { activity } from "./activity.schema";
import { entity } from "./entity.schema";

export const activityEvidence = pgTable("activity_evidence", {
    id: uuid("id").defaultRandom(),
    activityId: uuid("activity_id").notNull().references(() => activity.id),
    entityId: uuid("entity_id").notNull().references(() => entity.id),
    createdAt: date("created_at").notNull().defaultNow()
})