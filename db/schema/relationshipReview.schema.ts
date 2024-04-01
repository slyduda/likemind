import { date, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { relationship } from "./relationship.schema";
import { user } from "./user.schema";

export const relationshipReview = pgTable("relationship_review", {
    id: uuid("id").primaryKey().defaultRandom(),
    relationshipId: uuid("relationship_id").notNull().references(() => relationship.id),
    userId: uuid("user_id").notNull().references(() => user.id),
    createdAt: date("created_at").notNull().defaultNow()
}, (table) => {
    return {
        unq: unique().on(table.relationshipId, table.userId),
    }
})