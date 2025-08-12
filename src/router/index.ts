import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import DashboardView from '../views/Dashboard.vue'
import { authGuard, guestGuard } from '../middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      beforeEnter: authGuard, // Protection de la route
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: guestGuard, // Redirection si déjà connecté
      meta: { requiresGuest: true }
    },
    // { path: '/tasks', name: 'Tasks', component: TaskListView }, etc.
    // { path: '/admin', name: 'Admin', component: AdminDashboardView }, etc
  ],
})

export default router
