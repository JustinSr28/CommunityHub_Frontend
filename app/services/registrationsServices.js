import { api } from './api'

export const getRegistrations = () => {
  return api()('/registrations')
}

export const getRegistrationById = (id) => {
  return api()(`/registrations/${id}`)
}

export const getRegistrationsByEvent = (eventId) => {
  return api()(`/registrations/event/${eventId}`)
}

export const getUsersByEvent = (eventId) => {
  return api()(`/registrations/event/${eventId}/users`)
}

export const getRegistrationsByUser = (userId) => {
  return api()(`/registrations/user/${userId}`)
}

export const getRegistrationByEventAndUser = (eventId, userId) => {
  return api()(`/registrations/event/${eventId}/user/${userId}`)
}

export const addRegistration = (eventId, userId) => {
  return api()(`/registrations/event/${eventId}`, {
    method: 'POST',
    body: {
      user: userId
    }
  })
}

export const editRegistration = (id, registration) => {
  return api()(`/registrations/${id}`, {
    method: 'PUT',
    body: registration
  })
}

export const removeRegistration = (eventId, userId) => {
  return api()(`/registrations/event/${eventId}`, {
    method: 'DELETE',
    body: {
      user: userId
    }
  })
}