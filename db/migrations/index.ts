import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "..";

// Run the migrations
await migrate(db, { migrationsFolder: './db/migrations' });

// End the client connection
await client.end();