import {
  object,
  type Input,
  optional,
  string,
  transform,
  safeParse,
} from "valibot";
import "dotenv/config";

export const envSchema = object({
  POSTGRES_URL: string(),
  POSTGRES_HOST: string(),
  POSTGRES_PORT: transform(optional(string(), "5432"), (input) =>
    Number(input),
  ),
  POSTGRES_USER: string(),
  POSTGRES_PASSWORD: string(),
  POSTGRES_DATABASE: string(),
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
    interface ProcessEnv extends Input<typeof envSchema> {}
  }
}

export default {};
