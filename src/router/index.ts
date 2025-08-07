import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import LoginView from '../components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    // { path: '/tasks', name: 'Tasks', component: TaskListView }, etc.
    // { path: '/admin', name: 'Admin', component: AdminDashboardView }, etc
  ],
})

export default router
