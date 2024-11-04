export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  modules: ["@vueuse/nuxt", "@nuxt/ui", "@pinia/nuxt"],
  css: ["@/assets/global.css"],

  runtimeConfig: {
    public: {
      apiURL: "http://localhost:3005",
      authToken: process.env.AUTH_TOKEN_CODE,
    },
  },

  imports: {
    dirs: ["./types"],
  },
});
