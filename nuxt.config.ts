// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      VOICEVOX_API_KEY: process.env.VOICEVOX_API_KEY,
      RAPID_API_KEY: process.env.RAPID_API_KEY
    },
    css: ['~/assets/css/main.css'],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
})
