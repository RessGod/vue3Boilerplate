import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  
  // Initialiser l'auth depuis le localStorage
  authStore.initializeAuth()
  
  // Vérifier si l'utilisateur est authentifié
  if (authStore.isAuthenticated) {
    next()
  } else {
    // Rediriger vers la page de connexion
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  }
}

export const guestGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()
  
  // Initialiser l'auth depuis le localStorage
  authStore.initializeAuth()
  
  // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
  if (authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
}