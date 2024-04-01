import { date, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { user } from "./user.schema";
import { community } from "./community.schema";

export const communitySubscription = pgTable("community_subscription", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => user.id),
    communityId: uuid("community_id").notNull().references(() => community.id),
    createdAt: date("created_at").notNull().defaultNow()
}, (table) => {
    return {
        unq: unique().on(table.userId, table.communityId),
    }
})