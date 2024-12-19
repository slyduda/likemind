import { object, string, safeParse } from "valibot";
import type { InferInput } from "valibot";
import "dotenv/config";

export const envSchema = object({
  DATABASE_URL: string(),
  JWT_SECRET: string(),
  OPENAI_SECRET: string(),
});

export const safeProcessEnv = safeParse(envSchema, process.env);

if (!safeProcessEnv.success) {
  const issue = safeProcessEnv.issues[0];
  throw Error(issue.message);
}
export const processEnv = safeProcessEnv.output;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends InferInput<typeof envSchema> {}
  }
}
