import axios from 'axios'
import type { User } from '../types/user'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const userApi = {
  // Récupérer tous les utilisateurs
  async getUsers(): Promise<User[]> {
    const response = await api.get<User[]>('/users')
    return response.data
  },

  // Récupérer un utilisateur par ID
  async getUserById(id: number): Promise<User> {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  // Simuler une authentification avec JSONPlaceholder
  async authenticate(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      // Récupérer tous les utilisateurs
      const users = await this.getUsers()
      
      // Trouver l'utilisateur par email
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      
      if (!user) {
        throw new Error('Utilisateur non trouvé')
      }

      // Vérifier le mot de passe (tous les mots de passe sont "password")
      if (password !== 'password') {
        throw new Error('Mot de passe incorrect')
      }

      // Générer un token simulé
      const token = `jwt_token_${user.id}_${Date.now()}`

      return {
        user,
        token
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erreur lors de l\'authentification')
    }
  },

  // Vérifier la validité du token (simulation)
  async verifyToken(token: string): Promise<boolean> {
    // Simulation de vérification de token
    return token.startsWith('jwt_token_') && token.length > 20
  }
}

export default api