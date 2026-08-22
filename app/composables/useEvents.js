import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUser as getEventsByUserService,
  getAvailableEventsForUser as getAvailableEventsForUserService,
  getEventsByOrganizer as getEventsByOrganizerService,
  getTotalEvents,
  getActiveEvents,
  getFinishedEvents
} from '~/services/eventsServices'

export const useEvents = () => {

  const events = ref([])
  const event = ref(null)

  const loading = ref(false)
  const error = ref(null)

  const loadEvents = async () => {
    loading.value = true
    error.value = null

    try {
      events.value = await getEvents()
    } catch (err) {
      error.value = "No se pudieron cargar los eventos."
    } finally {
      loading.value = false
    }
  }

  const loadEvent = async (id) => {
    loading.value = true
    error.value = null

    try {
      event.value = await getEventById(id)
    } catch (err) {
      error.value = "No se pudo cargar el evento."
    } finally {
      loading.value = false
    }
  }
const addEvent = async (data) => {
  loading.value = true
  error.value = null

  try {

    const response = await createEvent(data)
    return response

  } catch (err) {
    console.error("ERROR AL CREAR EVENTO:", err)
    console.error("ERROR DEL BACKEND:", err.data)

    error.value = err.data?.message || "No se pudo crear el evento."

    throw err

  } finally {
    loading.value = false
  }
}

  const editEvent = async (id, data) => {
    loading.value = true
    error.value = null

    try {
      return await updateEvent(id, data)
    } catch (err) {
      error.value = "No se pudo actualizar el evento."
    } finally {
      loading.value = false
    }
  }

  const removeEvent = async (id) => {
    loading.value = true
    error.value = null

    try {
      return await deleteEvent(id)
    } catch (err) {
      error.value = "No se pudo eliminar el evento."
    } finally {
      loading.value = false
    }
  }

  const getEventsByUser = async (userId) => {
    loading.value = true
    error.value = null

    try {
      return await getEventsByUserService(userId)
    } catch (err) {
      error.value = "No se pudieron cargar los eventos del usuario."
    } finally {
      loading.value = false
    }
  }

  const getAvailableEventsForUser = async (userId) => {
    loading.value = true
    error.value = null

    try {
      return await getAvailableEventsForUserService(userId)
    } catch (err) {
      error.value = "No se pudieron cargar los eventos disponibles."
    } finally {
      loading.value = false
    }
  }

  const getEventsByOrganizer = async (organizerId) => {
    loading.value = true
    error.value = null

    try {
      return await getEventsByOrganizerService(organizerId)
    } catch (err) {
      error.value = "No se pudieron cargar los eventos del organizador."
    } finally {
      loading.value = false
    }
  }

  const loadTotalEvents = async () => {
    try {
      return await getTotalEvents()
    } catch (err) {
      error.value = "No se pudieron cargar los eventos."
    }
  }

  const loadActiveEvents = async () => {
    try {
      return await getActiveEvents()
    } catch (err) {
      error.value = "No se pudieron cargar los eventos activos."
    }
  }

  const loadFinishedEvents = async () => {
    try {
      return await getFinishedEvents()
    } catch (err) {
      error.value = "No se pudieron cargar los eventos finalizados."
    }
  }

  return {
    events,
    event,
    loading,
    error,

    loadEvents,
    loadEvent,
    addEvent,
    editEvent,
    removeEvent,

    getEventsByUser,
    getAvailableEventsForUser,
    getEventsByOrganizer,

    loadTotalEvents,
    loadActiveEvents,
    loadFinishedEvents
  }
}