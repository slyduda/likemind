import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const evidence = pgTable("evidence", {
    id: uuid("id").primaryKey().defaultRandom(),
    source: text("source").notNull(),
    description: text("description").notNull(),
    createdAt: date("created_at").notNull().defaultNow()
})