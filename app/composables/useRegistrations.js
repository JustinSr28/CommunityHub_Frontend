import { ref } from 'vue'

import {
  getRegistrations,
  getRegistrationById,
  getRegistrationsByEvent,
  getUsersByEvent,
  getRegistrationsByUser,
  getRegistrationByEventAndUser as getInscriptionsByEventAndUser,
  addRegistration as addRegistrationService,
  editRegistration as editRegistrationService,
  removeRegistration as removeRegistrationService
} from '~/services/registrationsServices'

export const useRegistrations = () => {

  const registrations = ref([])
  const registration = ref(null)
  const userRegistrations = ref([])

  const loading = ref(false)
  const error = ref(null)

  
  const loadRegistrations = async () => {
    loading.value = true
    error.value = null

    try {
      registrations.value = await getRegistrations()
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
      registration.value = await getRegistrationById(id)
    } catch (err) {
      error.value = "No se pudo cargar la inscripción."
    } finally {
      loading.value = false
    }
  }

 
  const loadRegistrationsByEvent = async (eventId) => {
    loading.value = true
    error.value = null

    try {
      return await getRegistrationsByEvent(eventId)
    } catch (err) {
      error.value =
        "No se pudieron cargar las inscripciones del evento."
    } finally {
      loading.value = false
    }
  }

  
  const loadUsersByEvent = async (eventId) => {
    loading.value = true
    error.value = null

    try {
      return await getUsersByEvent(eventId)
    } catch (err) {
      error.value =
        "No se pudieron cargar los usuarios del evento."
    } finally {
      loading.value = false
    }
  }

  const loadRegistrationsByUser = async (userId) => {
    loading.value = true
    error.value = null

    try {
      userRegistrations.value = await getRegistrationsByUser(userId)
    } catch (err) {
      error.value =
        "No se pudieron cargar las inscripciones del usuario."

      userRegistrations.value = []
    } finally {
      loading.value = false
    }
  }


  const addRegistration = async (eventId, userId) => {
    loading.value = true
    error.value = null

    try {
      return await addRegistrationService(eventId, userId)
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
      return await editRegistrationService(id, data)
    } catch (err) {
      error.value = "No se pudo actualizar la inscripción."
    } finally {
      loading.value = false
    }
  }

  const removeRegistration = async (eventId, userId) => {
    loading.value = true
    error.value = null

    try {
      return await removeRegistrationService(eventId, userId)
    } catch (err) {
      error.value = "No se pudo cancelar la inscripción."
    } finally {
      loading.value = false
    }
  }

  
  const getRegistrationByEventAndUser = async (eventId, userId) => {
    loading.value = true
    error.value = null

    try {
      return await getInscriptionsByEventAndUser(
        eventId,
        userId
      )
    } catch (err) {
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    registrations,
    registration,
    userRegistrations,

    loading,
    error,

    loadRegistrations,
    loadRegistration,
    loadRegistrationsByEvent,
    loadUsersByEvent,
    loadRegistrationsByUser,

    addRegistration,
    editRegistration,
    removeRegistration,
    getRegistrationByEventAndUser
  }

    
}
    
  