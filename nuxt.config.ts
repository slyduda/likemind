import "dotenv/config";
import { processEnv } from "./env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecret: processEnv.JWT_SECRET,
  },
  css: ["~/assets/css/main.css"],
  modules: [
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  veeValidate: {
    typedSchemaPackage: "valibot",
  },
});
