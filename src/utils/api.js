// API utility functions for Bunk Lab

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Helper function to make API requests
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)
    
    // Handle network errors
    if (!response.ok) {
      const data = await response.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(data.message || `Request failed with status ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
      throw new Error('Cannot connect to backend server. Please check if the backend is running and VITE_API_URL is set correctly.')
    }
    throw error
  }
}

// Auth API
export const authAPI = {
  signup: async (name, email, password) => {
    return request('/api/auth/signup', {
      method: 'POST',
      body: { name, email, password },
    })
  },

  login: async (email, password) => {
    return request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
  },

  getCurrentUser: async (token) => {
    return request('/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}

// Store token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem('bunklab_token', token)
}

// Get token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('bunklab_token')
}

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('bunklab_token')
}
