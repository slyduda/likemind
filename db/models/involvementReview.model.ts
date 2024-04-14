import {
  timestamp,
  pgTable,
  smallint,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { user, involvement } from ".";
import { relations } from "drizzle-orm";

export const involvementReview = pgTable(
  "involvement_review",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sentiment: smallint("sentiment").notNull(),
    impact: smallint("impact").notNull(),
    involvementId: uuid("involvement_id")
      .notNull()
      .references(() => involvement.id),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      unq: unique().on(table.involvementId, table.userId),
    };
  }
);

export const involvementReviewRelations = relations(
  involvementReview,
  ({ one }) => ({
    involvement: one(involvement, {
      fields: [involvementReview.involvementId],
      references: [involvement.id],
    }),
    user: one(user, {
      fields: [involvementReview.userId],
      references: [user.id],
    }),
  })
);
