import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./db/schema",
  out: "./db/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
} satisfies Config;
