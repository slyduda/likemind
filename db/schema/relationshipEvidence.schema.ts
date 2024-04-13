import { timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { relationship } from "./relationship.schema";
import { evidence } from "./evidence.schema";
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
  })
);
