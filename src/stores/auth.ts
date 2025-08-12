import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types/user'

export const useAuthStore = defineStore('auth', () => {
  // État
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const currentUser = computed(() => user.value)

  // Actions
  const setUser = (userData: User) => {
    user.value = userData
  }

  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    localStorage.setItem('auth_token', tokenValue)
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const login = async (userData: User, authToken: string) => {
    setUser(userData)
    setToken(authToken)
    setError(null)
  }

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'auth:', error)
        logout()
      }
    }
  }

  const saveUserToStorage = (userData: User) => {
    localStorage.setItem('auth_user', JSON.stringify(userData))
  }

  return {
    // État
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    setUser,
    setToken,
    setError,
    setLoading,
    login,
    logout,
    initializeAuth,
    saveUserToStorage
  }
})