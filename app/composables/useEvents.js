import {
  getEvents,
  getEventById,
  getFilteredEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUser as getEventsByUserService,
  getAvailableEventsForUser as getAvailableEventsForUserService,
  getEventsByOrganizer as getEventsByOrganizerService,
  getTotalEvents,
  getActiveEvents,
  getFinishedEvents,
  getEventLocations
} from '~/services/eventsServices'

export const useEvents = () => {

  const events = ref([])
  const event = ref(null)

  const loading = ref(false)
  const error = ref(null)

  const operationError = ref(null)
  let operationErrorTimeout = null

  const showOperationError = (message) => {
    operationError.value = message
    if (operationErrorTimeout) {
      clearTimeout(operationErrorTimeout)
    }
    operationErrorTimeout = setTimeout(() => {
      operationError.value = null
    }, 4000)
  }

  const loadEvents = async () => {
    loading.value = true
    error.value = null
    try {
      events.value = await getEvents()
      return events.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los eventos."
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const loadEvent = async (id) => {
    loading.value = true
    error.value = null
    try {
      event.value = await getEventById(id)
      return event.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar el evento."
      throw err
    } finally {
      loading.value = false
    }
  }

  const addEvent = async (data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await createEvent(data)
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo crear el evento."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const editEvent = async (id, data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await updateEvent(id, data)
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo actualizar el evento."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeEvent = async (id) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await deleteEvent(id)
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo eliminar el evento."
      )
      throw err
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
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los eventos del usuario."
      throw err
    } finally {
      loading.value = false
    }
  }

 const getAvailableEventsForUser = async (userId) => {
  loading.value = true
  error.value = null
  try {
    events.value = await getAvailableEventsForUserService(userId)
    return events.value
  } catch (err) {
    error.value =
      err.data?.message ||
      err.message ||
      "No se pudieron cargar los eventos disponibles."
    throw err
  } finally {
    loading.value = false
  }
}

  const getEventsByOrganizer = async (organizerId) => {
  loading.value = true
  error.value = null
  try {
    events.value = await getEventsByOrganizerService(organizerId)
    return events.value
  } catch (err) {
    error.value =
      err.data?.message ||
      err.message ||
      "No se pudieron cargar los eventos del organizador."
    throw err
  } finally {
    loading.value = false
  }
}

  const loadTotalEvents = async () => {
    loading.value = true
    error.value = null
    try {
      return await getTotalEvents()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar el total de eventos."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadLocations = async () => {
    loading.value = true
    error.value = null
    try {
      return await getEventLocations()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pueden cargar las ubicaciones."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadActiveEvents = async () => {
    loading.value = true
    error.value = null
    try {
      return await getActiveEvents()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los eventos activos."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadFinishedEvents = async () => {
    loading.value = true
    error.value = null
    try {
      return await getFinishedEvents()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los eventos finalizados."
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const filterEvents = async (filters = {}) => {
    loading.value = true
    error.value = null
    try {
      events.value = await getFilteredEvents(filters)
      return events.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron filtrar los eventos."
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    events,
    event,
    loading,
    error,
    operationError,
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
    loadFinishedEvents,
    loadLocations,
    filterEvents
  }
}
