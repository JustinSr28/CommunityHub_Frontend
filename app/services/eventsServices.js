import { api } from './api'

export const getEvents = () => {
  return api()('/events')
}

export const getFilteredEvents = (filters = {}) => {
  return api()('/events/filter', {
    query: filters
  })
}

export const getAvailableEventsForUser = (userId) => {
  return api()(`/events/user/${userId}/available`)
}

export const getEventsByUser = (userId) => {
  return api()(`/events/user/${userId}`)
}

export const getEventsByOrganizer = (organizerId) => {
  return api()(`/events/organizer/${organizerId}`)
}

export const getTotalEvents = () => {
  return api()('/events/dashboard/total')
}

export const getActiveEvents = () => {
  return api()('/events/dashboard/active')
}

export const getFinishedEvents = () => {
  return api()('/events/dashboard/finished')
}

export const getEventById = (id) => {
  return api()(`/events/${id}`)
}

export const createEvent = (event) => {
  return api()('/events', {
    method: 'POST',
    body: event
  })
}

export const updateEvent = (id, event) => {
  return api()(`/events/${id}`, {
    method: 'PUT',
    body: event
  })
}

export const deleteEvent = (id) => {
  return api()(`/events/${id}`, {
    method: 'DELETE'
  })
}