import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  app: {
    head: {
      title: "Just in case",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
      },
    },
  },
  css: ["@/assets/global.scss"],
  runtimeConfig: {
    baseURL: process.env.API_URL || "http://localhost:3001",
  },
  auth: {
    baseURL: process.env.API_URL || "http://localhost:3001",
    globalAppMiddleware: true,
    provider: {
      type: "local",
      session: {
        dataType: {
          user: {
            id: "number",
            username: "string",
            role: "string",
            can_access: "boolean",
          },
        },
      },
      endpoints: {
        signIn: { path: "/auth/login", method: "post" },
        signOut: false,
        getSession: { path: "/auth/session", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/token",
        maxAgeInSeconds: 60 * 60 * 24 * 7,
        type: "",
      },
    },
  },
  ssr: false,
});
