import { date, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { involvement } from "./involvement.schema";
import { user } from "./user.schema";

export const involvementReview = pgTable("involvement_review", {
    id: uuid("id").primaryKey().defaultRandom(),
    involvementId: uuid("involvement_id").notNull().references(() => involvement.id),
    userId: uuid("user_id").notNull().references(() => user.id),
    createdAt: date("created_at").notNull().defaultNow()
}, (table) => {
    return {
        unq: unique().on(table.involvementId, table.userId),
    }
})