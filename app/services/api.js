
export const api = () => {
  const config = useRuntimeConfig()

  return $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const token = localStorage.getItem('token')

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    }
  })
}