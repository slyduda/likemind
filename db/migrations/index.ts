import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "..";

export const runtimeMigrate = async () => {
  await migrate(db, { migrationsFolder: "./db/migrations" });

  await client.end();
};
