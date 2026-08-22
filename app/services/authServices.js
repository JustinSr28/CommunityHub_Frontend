import { api } from './api'

export const register = (user) => {
  return api()('/auth/register', {
    method: 'POST',
    body: user
  })
}

export const login = (credentials) => {
  return api()('/auth/login', {
    method: 'POST',
    body: credentials
  })
}

export const logout = () => {
  return api()('/auth/logout', {
    method: 'POST'
  })
}