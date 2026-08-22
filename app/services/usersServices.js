import { api } from './api'

export const getUsers = () => {
  return api()('/users')
}

export const checkUserExists = (email) => {
  return api()('/users/exists', {
    query: {
      email
    }
  })
}

export const getTotalUsers = () => {
  return api()('/users/dashboard/total')
}

export const getTotalOrganizers = () => {
  return api()('/users/dashboard/organizers')
}

export const getUserById = (id) => {
  return api()(`/users/${id}`)
}

export const getOrganizers = () => {
  return api()('/users/organizers')
}

export const createUser = (user) => {
  return api()('/users', {
    method: 'POST',
    body: user
  })
}

export const updateUser = (id, user) => {
  return api()(`/users/${id}`, {
    method: 'PUT',
    body: user
  })
}

export const deleteUser = (id) => {
  return api()(`/users/${id}`, {
    method: 'DELETE'
  })
}

export const getFavoriteEvents = (userId) => {
  return api()(`/users/${userId}/favorites`)
}

export const toggleFavorite = (userId, eventId) => {
  return api()(`/users/${userId}/favorites/${eventId}`, {
    method: 'POST'
  })
}