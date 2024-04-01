import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    handle: text("handle").notNull(),
    createdAt: date("created_at").notNull().defaultNow()
})