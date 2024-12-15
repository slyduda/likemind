import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const subject = pgTable("subject", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SubjectInsert = typeof subject.$inferInsert;
export type SubjectSelect = typeof subject.$inferSelect;
