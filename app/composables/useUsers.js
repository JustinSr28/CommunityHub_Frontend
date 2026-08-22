import {
  getUsers,
  checkUserExists as checkUserExistsService,
  getTotalUsers,
  getTotalOrganizers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getFavoriteEvents,
  toggleFavorite,
  getOrganizers
} from '~/services/usersServices'

export const useUsers = () => {

  const users = ref([])
  const user = ref(null)

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

  const loadUsers = async () => {
    loading.value = true
    error.value = null
    try {
      users.value = await getUsers()
      return users.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los usuarios."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadUser = async (id) => {
    loading.value = true
    error.value = null
    try {
      user.value = await getUserById(id)
      return user.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar el usuario."
      throw err
    } finally {
      loading.value = false
    }
  }

  const addUser = async (data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await createUser(data)
      await loadUsers()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo crear el usuario."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const editUser = async (id, data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await updateUser(id, data)
      await loadUsers()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo actualizar el usuario."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeUser = async (id) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await deleteUser(id)
      await loadUsers()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo eliminar el usuario."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const userExists = async (email) => {
    loading.value = true
    error.value = null
    try {
      const response =
        await checkUserExistsService(email)
      return response.exists
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo verificar el usuario."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadFavoriteEvents = async (userId) => {
    loading.value = true
    error.value = null
    try {
      return await getFavoriteEvents(userId)
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los eventos favoritos."
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleUserFavorite = async (userId, eventId) => {
    loading.value = true
    error.value = null
    try {
      return await toggleFavorite(
        userId,
        eventId
      )
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo actualizar el favorito."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadTotalUsers = async () => {
    loading.value = true
    error.value = null
    try {
      return await getTotalUsers()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar el total de usuarios."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadTotalOrganizers = async () => {
    loading.value = true
    error.value = null
    try {
      return await getTotalOrganizers()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar el total de organizadores."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadOrganizers = async () => {
    loading.value = true
    error.value = null
    try {
      return await getOrganizers()
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar los organizadores."
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    users,
    user,
    loading,
    error,
    operationError,
    loadUsers,
    loadUser,
    loadOrganizers,
    addUser,
    editUser,
    removeUser,
    userExists,
    loadFavoriteEvents,
    toggleUserFavorite,
    loadTotalUsers,
    loadTotalOrganizers
  }
}
