import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const community = pgTable("community", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: date("created_at").notNull().defaultNow()
})