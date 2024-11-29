import type { Config } from "drizzle-kit";
import { processEnv } from "./config";

export default {
  schema: "./db/models", // Renamed to models to separate valibot schemas
  out: "./db/migrations",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: processEnv.POSTGRES_URL,
  },
} satisfies Config;
