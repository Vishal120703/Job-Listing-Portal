import axios from 'axios'

const API_URL = '/api/User'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await api.post('/Signup', userData)
    return response.data
  },
  
  login: async (credentials) => {
    const response = await api.post('/Login', credentials)
    return response.data
  },
  
  logout: async () => {
    // Since we're using cookies, logout is handled client-side
    // by clearing the cookie
    return Promise.resolve()
  },
}

// Jobs API
export const jobsAPI = {
  getJobs: async (filters = {}) => {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params.append(key, filters[key])
      }
    })
    const response = await api.get(`/Jobs?${params.toString()}`)
    return response.data
  },
  
  getJob: async (id) => {
    const response = await api.get(`/Jobs/${id}`)
    return response.data
  },
  
  createJob: async (jobData) => {
    const response = await api.post('/Jobs', jobData)
    return response.data
  },
  
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData)
    return response.data
  },
  
  deleteJob: async (id) => {
    const response = await api.delete(`/Jobs/${id}`)
    return response.data
  },
}

// Profile API
export const profileAPI = {
  getProfile: async () => {
    const response = await api.get('/profile')
    return response.data
  },
  
  updateProfile: async (profileData) => {
    const formData = new FormData()
    
    Object.keys(profileData).forEach(key => {
      if (key === 'profileImage' || key === 'resume') {
        if (profileData[key]) {
          formData.append(key, profileData[key])
        }
      } else if (profileData[key] !== undefined && profileData[key] !== null && profileData[key] !== '') {
        formData.append(key, profileData[key])
      }
    })
    
    const response = await api.put('/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },
}

// Application API
export const applicationAPI = {
  applyToJob: async (jobId) => {
    const response = await api.post('/apply', { jobId })
    return response.data
  },
}

export default api

