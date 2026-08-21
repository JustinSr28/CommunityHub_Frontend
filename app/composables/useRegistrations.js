export const useRegistrations = () => {
  const registrations = ref([
    {
      id: 1,
      user: 2,
      event: 1,
      status: "confirmada",
      registeredAt: new Date()
    },
    {
      id: 2,
      user: 3,
      event: 2,
      status: "confirmada",
      registeredAt: new Date()
    },
    {
      id: 4,
      user: 1,
      event: 3,
      status: "confirmada",
      registeredAt: new Date()
    },
    {
      id: 3,
      user: 1,
      event: 2,
      status: "confirmada",
      registeredAt: new Date()
    }
  ])

  const registration = ref(null)
  const loading = ref(false)
  const error = ref(null)


  const loadRegistrations = async () => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
    } catch (err) {
      error.value = "No se pudieron cargar las inscripciones."
    } finally {
      loading.value = false
    }
  }
 
  const loadRegistration = async (id) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      registration.value = registrations.value.find(
        registration => registration.id == id
      )
    } catch (err) {
      error.value = "No se pudo cargar la inscripción."
      registration.value = null
    } finally {
      loading.value = false
    }
  }
  
  const loadRegistrationsByEvent = async (eventId) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      return registrations.value.filter(
        registration => registration.event == eventId
      )
    } catch (err) {
      error.value = "No se pudieron cargar las inscripciones del evento."
      return []
    } finally {
      loading.value = false
    }
  }

  const loadUsersByEvent = async (eventId) => {

    loading.value = true
    error.value = null

    try {

      await new Promise(resolve => setTimeout(resolve, 500))

      const eventRegistrations = registrations.value.filter(
        registration => registration.event == eventId
      )
      const userIds = eventRegistrations.map(
        registration => registration.user
      )

      return userIds

    } catch (err) {
      error.value ="No se pudieron cargar los usuarios del evento."
      return []
    } finally {
      loading.value = false
    }
  }

  const userRegistrations = ref([])

  const loadRegistrationsByUser = async (userId) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      userRegistrations.value = registrations.value.filter(
        registration => registration.user == userId
      )
    } catch (err) {
      error.value =
        "No se pudieron cargar las inscripciones del usuario."
      userRegistrations.value = []
    } finally {
      loading.value = false
    }
  }
  
  const addRegistration = async (data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newRegistration = {
        ...data,
        id: Date.now(),
        registeredAt: new Date()
      }
      registrations.value.push(newRegistration)
    } catch (err) {
      error.value = "No se pudo crear la inscripción."
    } finally {
      loading.value = false
    }
  }

  const editRegistration = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = registrations.value.findIndex(
        registration => registration.id === id
      )
      if (index !== -1) {
        registrations.value[index] = {
          ...registrations.value[index],
          ...data
        }
      }
    } catch (err) {
      error.value = "No se pudo actualizar la inscripción."
    } finally {
      loading.value = false
    }
  }
 
  const removeRegistration = async (id) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      registrations.value = registrations.value.filter(
        registration => registration.id !== id
      )
    } catch (err) {
      error.value = "No se pudo eliminar la inscripción."
    } finally {
      loading.value = false
    }
  }
  
  const getRegistrationByEventAndUser = (eventId, userId) => {
    return registrations.value.find(
      registration =>
        registration.event == eventId &&
        registration.user == userId
    )
  }


  //dashboard
  const loadTotalRegistrations = async () => { }
  return {
    registrations,
    registration,
    loading,
    error,
    loadRegistrations,
    loadRegistration,
    loadRegistrationsByEvent,
    addRegistration,
    editRegistration,
    removeRegistration,
    loadRegistrationsByUser,
    getRegistrationByEventAndUser,
    userRegistrations,
    loadUsersByEvent
  }
}