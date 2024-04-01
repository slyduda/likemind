import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

await client.connect();

export const db = drizzle(client);
