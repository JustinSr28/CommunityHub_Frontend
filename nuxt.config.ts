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
      apiBase: process.env.NUXT_PUBLIC_API_BASE,

      supabaseUrl: process.env.SUPABASE_URL,
      supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY
    }
  },
pwa: {
    registerType: 'autoUpdate',

    devOptions: {
      enabled: true,
      type: 'module'
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
          type: 'image/jpeg'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    workbox: {
      runtimeCaching: [

        
        {
          urlPattern: (options: { url: URL }) => {
  return options.url.href.includes('/api/categories')
},

          handler: 'NetworkFirst',

          options: {
            cacheName: 'communityhub-categories',

            networkTimeoutSeconds: 3,

            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 7
            },

            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },

        // =========================
        // IMÁGENES
        // =========================
        {
          urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/i,

          handler: 'CacheFirst',

          options: {
            cacheName: 'communityhub-images',

            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30
            },

            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }

      ]
    }
  }
})