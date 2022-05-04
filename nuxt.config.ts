import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: {
    dirs: [
      '~/components',
    ]
  },
  // target: 'static',
  ssr: false,
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    '~/assets/css/googlefont.css'
  ]
})
