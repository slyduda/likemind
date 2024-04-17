import type { Config } from "drizzle-kit";
import "dotenv/config";
import { processEnv } from "./env";

export default {
  schema: "./db/models", // Renamed to models to separate valibot schemas
  out: "./db/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: processEnv.POSTGRES_HOST,
    port: Number(processEnv.POSTGRES_PORT),
    user: processEnv.POSTGRES_USER,
    password: processEnv.POSTGRES_PASSWORD,
    database: processEnv.POSTGRES_DB,
  },
} satisfies Config;
