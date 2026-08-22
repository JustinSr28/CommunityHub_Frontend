import { api } from './api'

export const getEvents = () => {
  return api()('/events')
}

export const getFilteredEvents = (filters = {}) => {

  const params = new URLSearchParams()

  if (filters.category) {
    params.append("category", filters.category)
  }

  if (filters.date) {
    params.append("date", filters.date)
  }

  if (filters.location) {
    params.append("location", filters.location)
  }

  if (filters.availability) {
    params.append("availability", filters.availability)
  }

  if (filters.organizer) {
    params.append("organizer", filters.organizer)
  }

  const query = params.toString()

  return api()(
    `/events/filter${query ? `?${query}` : ""}`
  )
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

export const getEventLocations = () => {
  return api()('/events/locations')
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