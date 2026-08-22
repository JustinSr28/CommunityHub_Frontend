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

  const loadRegistrations = async () => {
    loading.value = true
    error.value = null
    try {
      registrations.value = await getRegistrations()
      return registrations.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar las inscripciones."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadRegistration = async (id) => {
    loading.value = true
    error.value = null
    try {
      registration.value = await getRegistrationById(id)
      return registration.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar la inscripción."
      throw err
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
        err.data?.message ||
        err.message ||
        "No se pudieron cargar las inscripciones del evento."
      throw err
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
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los usuarios del evento."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadRegistrationsByUser = async (userId) => {
    loading.value = true
    error.value = null
    try {
      userRegistrations.value =
        await getRegistrationsByUser(userId)
      return userRegistrations.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar las inscripciones del usuario."
      userRegistrations.value = []
      throw err
    } finally {
      loading.value = false
    }
  }

  const addRegistration = async (eventId, userId) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await addRegistrationService(eventId,userId)
      await loadRegistrations()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo crear la inscripción."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const editRegistration = async (id, data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await editRegistrationService(id,data)
      await loadRegistrations()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo actualizar la inscripción."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeRegistration = async (eventId, userId) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await removeRegistrationService(eventId,userId)
      await loadRegistrations()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo cancelar la inscripción."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const getRegistrationByEventAndUser = async (eventId, userId) => {
    loading.value = true
    error.value = null
    try {
      return await getInscriptionsByEventAndUser(eventId, userId)
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo consultar la inscripción."
      throw err
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
    operationError,
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
