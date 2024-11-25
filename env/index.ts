import {
  object,
  optional,
  string,
  safeParse,
  pipe,
  type InferInput,
  transform,
} from "valibot";
import "dotenv/config";

export const envSchema = object({
  POSTGRES_URL: string(),
  POSTGRES_HOST: string(),
  POSTGRES_PORT: pipe(
    optional(string(), "5432"),
    transform((input) => Number(input)),
  ),
  POSTGRES_USER: string(),
  POSTGRES_PASSWORD: string(),
  POSTGRES_DB: string(),
  JWT_SECRET: string(),
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

export default {};
