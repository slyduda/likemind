import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const entity = pgTable("entity", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    createdAt: date("created_at").notNull().defaultNow()
})