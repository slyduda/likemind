import type { Config } from "drizzle-kit";
import { processEnv } from "./config";

export default {
  schema: "./db/models", // Renamed to models to separate valibot schemas
  out: "./db/migrations",
  dialect: "postgresql", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: processEnv.DATABASE_URL,
  },
} satisfies Config;
