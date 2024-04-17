import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { processEnv } from "~/env";

export const client = new pg.Client({
  host: processEnv.POSTGRES_HOST,
  port: Number(processEnv.POSTGRES_PORT),
  user: processEnv.POSTGRES_USER,
  password: processEnv.POSTGRES_PASSWORD,
  database: processEnv.POSTGRES_DB,
});

client.connect(); // TODO: Figure out if this NNEDS to be awaited
export const db = drizzle(client);
