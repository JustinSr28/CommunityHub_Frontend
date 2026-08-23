export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2026-08-18',
  modules: ['@vite-pwa/nuxt'],
  devtools: { enabled: true },

  devServer: {
    port: 3001
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  pwa: {
    registerType: 'autoUpdate',

    devOptions: {
      enabled: true
    },

    manifest: {
      name: 'Community Hub',
      short_name: 'Community Hub',
      description: 'Events',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#ffffff',

      icons: [
        {
          src: '/pwa-192x192.jpg',
          sizes: '192x192',
          type: 'image/jpg'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})