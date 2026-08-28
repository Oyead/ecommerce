import axios from 'axios'

// Base URL for our persistent NeonDB backend.
// During dev the Vite proxy forwards /api/* to the local server (see vite.config.js).
export const api = axios.create({
  baseURL: '/api',
})

// Attach the JWT from localStorage to every authenticated request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = token
  return config
})
