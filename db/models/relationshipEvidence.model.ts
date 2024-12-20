import { timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { relationship, evidence } from ".";
import { relations } from "drizzle-orm";

export const relationshipEvidence = pgTable("relationship_evidence", {
  id: uuid("id").defaultRandom(),
  relationshipId: uuid("relationship_id")
    .notNull()
    .references(() => relationship.id),
  evidenceId: uuid("evidence_id")
    .notNull()
    .references(() => evidence.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const relationshipEvidencesRelations = relations(
  relationshipEvidence,
  ({ one }) => ({
    relationship: one(relationship, {
      fields: [relationshipEvidence.relationshipId],
      references: [relationship.id],
    }),
    evidence: one(evidence, {
      fields: [relationshipEvidence.evidenceId],
      references: [evidence.id],
    }),
  }),
);

export type RelationshipEvidenceInsert =
  typeof relationshipEvidence.$inferInsert;
export type RelationshipEvidenceSelect =
  typeof relationshipEvidence.$inferSelect;
