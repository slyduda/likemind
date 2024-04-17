import type { Config } from "drizzle-kit";
import { processEnv } from "./env";

export default {
  schema: "./db/models", // Renamed to models to separate valibot schemas
  out: "./db/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: processEnv.POSTGRES_HOST,
    port: processEnv.POSTGRES_PORT,
    user: processEnv.POSTGRES_USER,
    password: processEnv.POSTGRES_PASSWORD,
    database: processEnv.POSTGRES_DATABASE,
    ssl: process.env.NODE_ENV === "production" ? true : false,
  },
} satisfies Config;
