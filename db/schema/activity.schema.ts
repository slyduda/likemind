import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const activity = pgTable("activity", {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description").notNull(),
    startedAt: date("started_at").notNull(),
    endedAt: date("ended_at"),
    createdAt: date("created_at").notNull().defaultNow()
})