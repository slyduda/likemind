import { date, pgTable, uuid } from "drizzle-orm/pg-core";

export const relationship = pgTable("relationship", {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: date("created_at").notNull().defaultNow()
})