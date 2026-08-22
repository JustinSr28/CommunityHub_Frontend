import { ref } from 'vue'

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
  toggleFavorite
} from '~/services/usersServices'

export const useUsers = () => {

  const users = ref([])
  const user = ref(null)

  const loading = ref(false)
  const error = ref(null)

  const loadUsers = async () => {
    loading.value = true
    error.value = null

    try {
      users.value = await getUsers()
    } catch (err) {
      error.value = "No se pudieron cargar los usuarios."
    } finally {
      loading.value = false
    }
  }

  const loadUser = async (id) => {
    loading.value = true
    error.value = null

    try {
      user.value = await getUserById(id)
    } catch (err) {
      error.value = "No se pudo cargar el usuario."
    } finally {
      loading.value = false
    }
  }

const addUser = async (data) => {
  loading.value = true
  error.value = null

  try {
    
    const response = await createUser(data)
    return response

  } catch (err) {
    error.value = err.data?.message || "No se pudo crear el usuario."
    throw err

  } finally {
    loading.value = false
  }
}

  const editUser = async (id, data) => {
    loading.value = true
    error.value = null

    try {
      return await updateUser(id, data)
    } catch (err) {
      error.value = "No se pudo actualizar el usuario."
    } finally {
      loading.value = false
    }
  }

  const removeUser = async (id) => {
    loading.value = true
    error.value = null

    try {
      return await deleteUser(id)
    } catch (err) {
      error.value = "No se pudo eliminar el usuario."
    } finally {
      loading.value = false
    }
  }

  const userExists = async (email) => {
    loading.value = true
    error.value = null

    try {
      const response = await checkUserExistsService(email)

      return response.exists

    } catch (err) {
      error.value = "No se pudo verificar el usuario."
      return false
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
        "No se pudieron cargar los eventos favoritos."

      return []
    } finally {
      loading.value = false
    }
  }


  const toggleUserFavorite = async (userId, eventId) => {
    loading.value = true
    error.value = null

    try {
      return await toggleFavorite(userId, eventId)
    } catch (err) {
      error.value =
        "No se pudo actualizar el favorito."
    } finally {
      loading.value = false
    }
  }

 
  const loadTotalUsers = async () => {
    try {
      return await getTotalUsers()
    } catch (err) {
      error.value = "No se pudo cargar el total de usuarios."
    }
  }

  const loadTotalOrganizers = async () => {
    try {
      return await getTotalOrganizers()
    } catch (err) {
      error.value =
        "No se pudo cargar el total de organizadores."
    }
  }

  return {
    users,
    user,
    loading,
    error,

    loadUsers,
    loadUser,

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
    
  