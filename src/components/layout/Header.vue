<template>
  <header class="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo et titre -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('nav.dashboard') }}</h1>
          </div>
        </div>

        <!-- Navigation et contrôles -->
        <div class="flex items-center space-x-4">
          <!-- Navigation -->
          <nav class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <router-link
                :to="{ name: 'Dashboard' }"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                :class="{ 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20': $route.name === 'Dashboard' }"
              >
                {{ $t('nav.dashboard') }}
              </router-link>
              <router-link
                :to="{ name: 'Home' }"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                :class="{ 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20': $route.name === 'Home' }"
              >
                {{ $t('nav.home') }}
              </router-link>
              <router-link
                :to="{ name: 'Login' }"
                class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                :class="{ 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20': $route.name === 'Login' }"
              >
                {{ $t('nav.login') }}
              </router-link>
            </div>
          </nav>

          <!-- Sélecteur de langue -->
          <div class="relative">
            <select
              v-model="currentLocale"
              @change="changeLanguage"
              class="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 px-3 py-1"
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="mg">🇲🇬 MG</option>
            </select>
          </div>

          <!-- Informations utilisateur (si connecté) -->
          <div v-if="isAuthenticated" class="flex items-center space-x-3">
            <span class="text-sm text-gray-600 dark:text-gray-300">
              {{ $t('nav.welcome') || 'Bonjour' }}, {{ currentUser?.name }}
            </span>
            <button
              @click="handleLogout"
              class="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              {{ $t('nav.logout') || 'Déconnexion' }}
            </button>
          </div>

          <!-- Bouton thème -->
          <button
            @click="toggleTheme"
            class="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :title="theme === 'light' ? $t('theme.dark') : $t('theme.light')"
          >
            <svg v-if="theme === 'light'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
          </button>

          <!-- Menu mobile -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menu mobile déroulant -->
      <div v-if="showMobileMenu" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
          <router-link
            :to="{ name: 'Dashboard' }"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            {{ $t('nav.dashboard') }}
          </router-link>
          <router-link
            :to="{ name: 'Home' }"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            {{ $t('nav.home') }}
          </router-link>
          <router-link
            :to="{ name: 'Login' }"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="closeMobileMenu"
          >
            {{ $t('nav.login') }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTheme } from '../../composables/useTheme'
import { useUsers } from '../../composables/useUsers'

const { locale } = useI18n()
const { theme, toggleTheme, initTheme } = useTheme()
const { isAuthenticated, currentUser, logout } = useUsers()
const router = useRouter()

const showMobileMenu = ref(false)
const currentLocale = ref(locale.value)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const changeLanguage = () => {
  locale.value = currentLocale.value
  localStorage.setItem('locale', currentLocale.value)
}

const handleLogout = () => {
  logout()
  router.push({ name: 'Home' })
}

onMounted(() => {
  initTheme()
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale) {
    locale.value = savedLocale
    currentLocale.value = savedLocale
  }
})
</script>