export const useCategories = () => {
  const categories = ref([
    {
      id: 1,
      name: "Deportes",
      description: "Actividades deportivas y recreativas.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Educación",
      description: "Talleres, cursos y actividades educativas.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Cultura",
      description: "Actividades relacionadas con arte, cultura y tradiciones.",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  const category = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const loadCategories = async () => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
    } catch (err) {
      error.value = "No se pudieron cargar las categorías."
    } finally {
      loading.value = false
    }
  }
  const loadCategory = async (id) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      category.value = categories.value.find(
        category => category.id == id
      )
    } catch (err) {
      error.value = "No se pudo cargar la categoría."
      category.value = null
    } finally {
      loading.value = false
    }
  }
  const addCategory = async (data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newCategory = {
        ...data,
        id: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      categories.value.push(newCategory)
    } catch (err) {
      error.value = "No se pudo crear la categoría."
    } finally {
      loading.value = false
    }
  }
  const editCategory = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = categories.value.findIndex(
        category => category.id === id
      )
      if (index !== -1) {
        categories.value[index] = {
          ...categories.value[index],
          ...data,
          updatedAt: new Date()
        }
      }
    } catch (err) {
      error.value = "No se pudo actualizar la categoría."
    } finally {
      loading.value = false
    }
  }
  const removeCategory = async (id) => {
    loading.value = true
    error.value = null
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      categories.value = categories.value.filter(
        category => category.id !== id
      )
    } catch (err) {
      error.value = "No se pudo eliminar la categoría."
    } finally {
      loading.value = false
    }
  }
  return {
    categories,
    category,
    loading,
    error,
    loadCategories,
    loadCategory,
    addCategory,
    editCategory,
    removeCategory
  }
}