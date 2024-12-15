import "dotenv/config";
import { processEnv } from "./config";
// We are prioritizing the yarn migrate:push (drizzle-kit migration) in the build command
// import { runtimeMigrate } from "./db/migrations";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // hooks: {
  //   "build:before": async () => {
  //     await runtimeMigrate();
  //   },
  // },

  devtools: { enabled: false },

  runtimeConfig: {
    jwtSecret: processEnv.JWT_SECRET,
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@samk-dev/nuxt-vcalendar",
    "@nuxt/icon",
    "@nuxtjs/supabase",
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

  googleFonts: {
    display: "swap",
    families: {
      Outfit: "100..900",
    },
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  app: {
    head: {
      meta: [
        {
          name: "theme-color",
          content: "#e4e4e7",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-21",
});
