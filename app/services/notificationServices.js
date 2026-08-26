import { api } from './api'

export const getMyNotifications = () => {
  return api()('/notifications/me', {
    method: 'GET'
  })
}