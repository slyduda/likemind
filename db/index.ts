import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { processEnv } from "../config";

export const client = new Pool({
  connectionString: processEnv.DATABASE_URL,
});

client.connect(); // TODO: Figure out if this NEEDS to be awaited
export const db = drizzle(client);
