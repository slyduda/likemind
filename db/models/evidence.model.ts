import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid, boolean } from "drizzle-orm/pg-core";
import { activityEvidence, involvementEvidence, relationshipEvidence } from ".";

export const evidence = pgTable("evidence", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const evidenceRelations = relations(evidence, ({ many }) => ({
  activityEvidences: many(activityEvidence),
  relationshipEvidences: many(relationshipEvidence),
  involvementEvidences: many(involvementEvidence),
}));

export type EvidenceInsert = typeof evidence.$inferInsert;
export type EvidenceSelect = typeof evidence.$inferSelect;
