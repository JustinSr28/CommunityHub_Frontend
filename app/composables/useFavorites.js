export const useFavorites = () => {

  const { user } = useAuth()
  const { loadFavoriteEvents, toggleUserFavorite } = useUsers()

  const favoritos = ref([])
  const favoriteEvents = ref([])

  const loadingFavoritos = ref(false)
  const errorFavoritos = ref(null)

  const loadMyFavorites = async () => {

    try {

      if (!user.value?.id) {
        favoritos.value = []
        favoriteEvents.value = []
        return
      }

      loadingFavoritos.value = true
      errorFavoritos.value = null

      const events = await loadFavoriteEvents(user.value.id)

      favoriteEvents.value = events || []

      favoritos.value = (events || []).map(
        event => event._id || event.id
      )

    } catch (error) {

      console.error(
        "Error al cargar favoritos:",
        error
      )

      favoritos.value = []
      favoriteEvents.value = []
      errorFavoritos.value =
        "No se pudieron cargar los favoritos."

    } finally {

      loadingFavoritos.value = false

    }
  }

  const handleToggleFavorito = async (event) => {

    try {

      const userId = user.value?.id
      const eventId = event.id || event._id

      if (!userId || !eventId) {
        console.error(
          "Falta el ID del usuario o del evento"
        )
        return
      }

      await toggleUserFavorite(userId, eventId)

      if (favoritos.value.includes(eventId)) {

        favoritos.value = favoritos.value.filter(
          id => id !== eventId
        )

        favoriteEvents.value =
          favoriteEvents.value.filter(
            event => (event.id || event._id) !== eventId
          )

      } else {

        favoritos.value.push(eventId)

      }

    } catch (error) {

      console.error(
        "Error al actualizar favorito:",
        error
      )

      throw error
    }
  }

  const esFavorito = (eventId) => {
    return favoritos.value.includes(eventId)
  }

  return {
    favoritos,
    favoriteEvents,
    loadingFavoritos,
    errorFavoritos,
    loadMyFavorites,
    handleToggleFavorito,
    esFavorito
  }
}