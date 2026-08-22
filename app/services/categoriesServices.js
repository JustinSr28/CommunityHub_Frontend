import { api } from './api'

export const getCategories = () => {
  return api()('/categories')
}

export const getCategoryById = (id) => {
  return api()(`/categories/${id}`)
}

export const createCategory = (category) => {
  return api()('/categories', {
    method: 'POST',
    body: category
  })
}

export const updateCategory = (id, category) => {
  return api()(`/categories/${id}`, {
    method: 'PUT',
    body: category
  })
}

export const deleteCategory = (id) => {
  return api()(`/categories/${id}`, {
    method: 'DELETE'
  })
}