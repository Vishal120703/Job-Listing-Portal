import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated by trying to fetch profile
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { profileAPI } = await import('../services/api')
      const data = await profileAPI.getProfile()
      setUser(data.basicDetails)
      setLoading(false)
    } catch (error) {
      setUser(null)
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      await authAPI.login(credentials)
      await checkAuth()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      }
    }
  }

  const signup = async (userData) => {
    try {
      await authAPI.signup(userData)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed',
      }
    }
  }

  const logout = async () => {
    try {
      // Clear cookie by making a request or just clear client state
      // Since backend uses httpOnly cookies, we need to clear it server-side
      // For now, just clear client state
      setUser(null)
      // Optionally, you could add a logout endpoint on backend
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.message,
      }
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

