import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export const client = new pg.Client({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

client.connect(); // TODO: Figure out if this NNEDS to be awaited
export const db = drizzle(client);
