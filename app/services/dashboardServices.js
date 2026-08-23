import { api } from './api'

export const getAdminStats = () => {
  return api()('/dashboard/admin', {
    method: 'GET'
  })
}

export const getOrganizerStats = () => {
  return api()('/dashboard/organizer', {
    method: 'GET'
  })
}

export const getUserStats = () => {
  return api()('/dashboard/user', {
    method: 'GET'
  })
}