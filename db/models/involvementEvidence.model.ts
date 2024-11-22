import { timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { involvement, evidence } from ".";
import { relations } from "drizzle-orm";

export const involvementEvidence = pgTable("involvement_evidence", {
  id: uuid("id").defaultRandom(),
  involvementId: uuid("involvement_id")
    .notNull()
    .references(() => involvement.id),
  evidenceId: uuid("evidence_id")
    .notNull()
    .references(() => evidence.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isFake: boolean("is_fake").notNull().default(false),
});

export const involvementEvidenceRelations = relations(
  involvementEvidence,
  ({ one }) => ({
    evidence: one(evidence, {
      fields: [involvementEvidence.evidenceId],
      references: [evidence.id],
    }),
    involvement: one(involvement, {
      fields: [involvementEvidence.involvementId],
      references: [involvement.id],
    }),
  }),
);

export type InvolvementEvidenceInsert = typeof involvementEvidence.$inferInsert;
export type InvolvementEvidenceSelect = typeof involvementEvidence.$inferSelect;
