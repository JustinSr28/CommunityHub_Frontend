export const useUsers = () => {
  const users = ref([
    {
      id: 1,
      name: "Sheyla",
      lastName: "Murillo",
      email: "sheyla@example.com",
      password: "123456",
      urlPhoto: "https://i.pravatar.cc/150?img=47",
      role: "admin",
      status: "Activo",
      favorites: [1, 3],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Carlos",
      lastName: "Rodríguez",
      email: "carlos@example.com",
      password: "123456",
      urlPhoto: "https://i.pravatar.cc/150?img=12",
      role: "organizer",
      status: "Activo",
      favorites: [2],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "María",
      lastName: "López",
      email: "maria@example.com",
      password: "123456",
      urlPhoto: "https://i.pravatar.cc/150?img=32",
      role: "admin",
      status: "Activo",
      favorites: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const loadUsers = async () => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
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
      await new Promise(resolve => setTimeout(resolve, 500))
      user.value = users.value.find(
        user => user.id == id
      )
    } catch (err) {
      error.value = "No se pudo cargar el usuario."
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const addUser = async (data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newUser = {
        ...data,
        id: Date.now(),
        favorites: data.favorites || [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      users.value.push(newUser)
    } catch (err) {
      error.value = "No se pudo crear el usuario."
    } finally {
      loading.value = false
    }
  }

  const editUser = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = users.value.findIndex(
        user => user.id === id
      )
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...data,
          updatedAt: new Date()
        }
      }
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
      await new Promise(resolve => setTimeout(resolve, 500))
      users.value = users.value.filter(
        user => user.id !== id
      )
    } catch (err) {
      error.value = "No se pudo eliminar el usuario."
    } finally {
      loading.value = false
    }
  }

  const userExists = (email) => {
    return users.value.some(
      user => user.email.toLowerCase() === email.toLowerCase()
    )
  }

  const loadFavoriteEvents = async (userId) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      const currentUser = users.value.find(
        user => user.id == userId
      )
      if (!currentUser) {
        throw new Error("Usuario no encontrado")
      }
      return currentUser.favorites || []
    } catch (err) {
      error.value = "No se pudieron cargar los eventos favoritos."
      return []
    } finally {
      loading.value = false
    }
  }


  //dashboard
  const loadTotalUsers = async () => { }
  const loadTotalOrganizers = async () => { }
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
    loadTotalUsers,
    loadTotalOrganizers
  }
}