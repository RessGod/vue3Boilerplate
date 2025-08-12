import { ref, computed } from 'vue'
import { userApi } from '../services/api'
import { useAuthStore } from '../stores/auth'
import type { User, LoginCredentials } from '../types/user'

export const useUsers = () => {
  const authStore = useAuthStore()
  
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const allUsers = computed(() => users.value)
  const userCount = computed(() => users.value.length)
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const currentUser = computed(() => authStore.currentUser)

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const data = await userApi.getUsers()
      users.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors du chargement des utilisateurs'
      console.error('Erreur fetchUsers:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer un utilisateur par ID
  const fetchUserById = async (id: number): Promise<User | null> => {
    isLoading.value = true
    error.value = null
    
    try {
      const user = await userApi.getUserById(id)
      return user
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors du chargement de l\'utilisateur'
      console.error('Erreur fetchUserById:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Connexion utilisateur
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    authStore.setLoading(true)
    authStore.setError(null)
    
    try {
      const { user, token } = await userApi.authenticate(credentials.email, credentials.password)
      
      // Sauvegarder dans le store
      await authStore.login(user, token)
      authStore.saveUserToStorage(user)
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la connexion'
      authStore.setError(errorMessage)
      console.error('Erreur login:', err)
      return false
    } finally {
      authStore.setLoading(false)
    }
  }

  // Déconnexion utilisateur
  const logout = () => {
    authStore.logout()
    users.value = []
  }

  // Vérifier l'authentification
  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      return false
    }

    try {
      const isValid = await userApi.verifyToken(token)
      if (!isValid) {
        logout()
        return false
      }
      return true
    } catch (err) {
      console.error('Erreur checkAuth:', err)
      logout()
      return false
    }
  }

  // Initialiser l'authentification
  const initAuth = () => {
    authStore.initializeAuth()
  }

  // Trouver un utilisateur par email
  const findUserByEmail = (email: string): User | undefined => {
    return users.value.find(user => user.email.toLowerCase() === email.toLowerCase())
  }

  // Filtrer les utilisateurs
  const filterUsers = (searchTerm: string): User[] => {
    if (!searchTerm) return users.value
    
    const term = searchTerm.toLowerCase()
    return users.value.filter(user => 
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    )
  }

  return {
    // État
    users,
    isLoading: computed(() => isLoading.value || authStore.isLoading),
    error: computed(() => error.value || authStore.error),
    
    // Getters
    allUsers,
    userCount,
    isAuthenticated,
    currentUser,
    
    // Actions
    fetchUsers,
    fetchUserById,
    login,
    logout,
    checkAuth,
    initAuth,
    findUserByEmail,
    filterUsers
  }
}