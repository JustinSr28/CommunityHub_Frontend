export const useEvents = () => {
  const events = ref([
    {
      id: 1,
      title: "Torneo de Fútbol Comunitario",
      description: "Torneo abierto para jóvenes de la comunidad.",
      category: "Deportes",
      date: "2026-08-25",
      time: "10:00",
      location: "Plaza de San Rafael",
      max_capacity: 50,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
      organizer: 1,
      status: "Activo",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: "Taller de Programación Web",
      description: "Introducción al desarrollo web con JavaScript.",
      category: "Educación",
      date: "2026-08-28",
      time: "14:00",
      location: "Centro Comunitario",
      max_capacity: 30,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      organizer: 1,
      status: "Activo",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: "Feria de Emprendedores",
      description: "Espacio para conocer emprendimientos locales.",
      category: "Emprendimiento",
      date: "2026-09-02",
      time: "09:00",
      location: "Salón Municipal",
      max_capacity: 100,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      organizer: 1,
      status: "Activo",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  const event = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadEvents = async () => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
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
      await new Promise(resolve => setTimeout(resolve, 500))
      event.value = events.value.find(
        event => event.id == id
      )
    } catch (err) {
      error.value = "No se pudo cargar el evento."
      event.value = null
    } finally {
      loading.value = false
    }
  }

  const addEvent = async (data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newEvent = {
        ...data,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      events.value.push(newEvent)
    } catch (err) {
      error.value = "No se pudo crear el evento."
    } finally {
      loading.value = false
    }
  }

  const editEvent = async (id, data) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = events.value.findIndex(
        event => event.id === id
      )
      if (index !== -1) {
        events.value[index] = {
          ...events.value[index],
          ...data,
          updatedAt: new Date()
        }
      }
    } finally {
      loading.value = false
    }
  }

  const removeEvent = async (id) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      events.value = events.value.filter(
        event => event.id !== id
      )
    } finally {
      loading.value = false
    }
  }

  const getEventsByUser = (userId, registrations) => {
    const userRegistrations = registrations.filter(
      registration => registration.user == userId
    )
    return events.value.filter(event =>
      userRegistrations.some(
        registration => registration.event == event.id
      )
    )
  }

  const getAvailableEventsForUser = (userId, registrations) => {
    const userRegistrations = registrations.filter(
      registration => registration.user == userId
    )
    return events.value.filter(event =>
      !userRegistrations.some(
        registration => registration.event == event.id
      )
    )
  }

  const getEventsByOrganizer = (organizerId) => {
    return events.value.filter(
      event => event.organizer == organizerId
    )
  }
  
  //dashboard
  const loadTotalEvents = async () => { }
  const loadActiveEvents = async () => { }
  const loadFinishedEvents = async () => { }
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
    loadActiveEvents,
    loadFinishedEvents,
    loadTotalEvents
  }
}