import { ref } from 'vue'

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

  const loadCategories = async () => {
    loading.value = true
    error.value = null

    try {
      categories.value = await getCategories()
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
      category.value = await getCategoryById(id)
    } catch (err) {
      error.value = "No se pudo cargar la categoría."
    } finally {
      loading.value = false
    }
  }

  const addCategory = async (data) => {
    loading.value = true
    error.value = null

    try {
      return await createCategory(data)
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
      return await updateCategory(id, data)
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
      return await deleteCategory(id)
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

    
   
