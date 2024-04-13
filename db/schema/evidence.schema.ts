import { relations } from "drizzle-orm";
import { timestamp, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { activityEvidence, relationshipEvidence } from ".";

export const evidence = pgTable("evidence", {
  id: uuid("id").primaryKey().defaultRandom(),
  source: text("source").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const evidenceRelations = relations(evidence, ({ many }) => ({
  activityEvidences: many(activityEvidence),
  relationshipEvidences: many(relationshipEvidence),
}));
