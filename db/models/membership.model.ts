import { timestamp, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { user, community } from ".";
import { relations } from "drizzle-orm";

export const membership = pgTable(
  "membership",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    communityId: uuid("community_id")
      .notNull()
      .references(() => community.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => {
    return {
      unq: unique().on(table.userId, table.communityId),
    };
  },
);

export const membershipRelations = relations(membership, ({ one }) => ({
  user: one(user, {
    fields: [membership.userId],
    references: [user.id],
  }),
  community: one(community, {
    fields: [membership.communityId],
    references: [community.id],
  }),
}));
