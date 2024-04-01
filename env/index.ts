import {z} from "zod"

export const env = z.object({
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string()
})

env.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv
            extends z.infer<typeof env> {}
    }
}