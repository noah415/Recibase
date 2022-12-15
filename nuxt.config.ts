// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      link: [
        {
          href: 'https://cdn.jsdelivr.net/npm/uikit@3.15.18/dist/css/uikit.min.css',
          rel: 'stylesheet',
          type: 'text/css',
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/uikit@3.15.18/dist/js/uikit.min.js'
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/uikit@3.15.18/dist/js/uikit-icons.min.js'
        }
      ]
    }
  }
})
