import { timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { activity, evidence } from ".";
import { relations } from "drizzle-orm";

export const activityEvidence = pgTable("activity_evidence", {
  id: uuid("id").defaultRandom(),
  activityId: uuid("activity_id")
    .notNull()
    .references(() => activity.id),
  evidenceId: uuid("evidence_id")
    .notNull()
    .references(() => evidence.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const activityEvidenceRelations = relations(
  activityEvidence,
  ({ one }) => ({
    evidence: one(evidence, {
      fields: [activityEvidence.evidenceId],
      references: [evidence.id],
    }),
    activity: one(activity, {
      fields: [activityEvidence.activityId],
      references: [activity.id],
    }),
  })
);
