import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '~/services/categoriesServices'

export const useCategories = () => {

  const categories = ref([])
  const category = ref(null)

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

  const loadCategories = async () => {
    loading.value = true
    error.value = null
    try {
      categories.value = await getCategories()
      return categories.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudieron cargar las categorías."
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadCategory = async (id) => {
    loading.value = true
    error.value = null
    try {
      category.value = await getCategoryById(id)
      return category.value
    } catch (err) {
      error.value =
        err.data?.message ||
        err.message ||
        "No se pudo cargar la categoría."
      throw err
    } finally {
      loading.value = false
    }
  }

  const addCategory = async (data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await createCategory(data)
      await loadCategories()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo crear la categoría."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const editCategory = async (id, data) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await updateCategory(id, data)
      await loadCategories()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo actualizar la categoría."
      )
      throw err
    } finally {
      loading.value = false
    }
  }

  const removeCategory = async (id) => {
    loading.value = true
    operationError.value = null
    try {
      const response = await deleteCategory(id)
      await loadCategories()
      return response
    } catch (err) {
      showOperationError(
        err.data?.message ||
        err.message ||
        "No se pudo eliminar la categoría."
      )
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    categories,
    category,
    loading,
    error,
    operationError,
    loadCategories,
    loadCategory,
    addCategory,
    editCategory,
    removeCategory
  }
}
