import { object, type Input, string, parse } from "valibot";

export const envSchema = object({
  POSTGRES_HOST: string(),
  POSTGRES_PORT: string(),
  POSTGRES_USER: string(),
  POSTGRES_PASSWORD: string(),
  POSTGRES_DB: string(),
});

parse(envSchema, process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Input<typeof envSchema> {}
  }
}

export default {};
