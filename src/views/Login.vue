<template>
  <div class="max-w-md mx-auto mt-8 px-4">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('login.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-300">{{ $t('login.subtitle') }}</p>
      </div>

      <!-- Message d'erreur -->
      <div v-if="error" class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
        <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Aide pour les utilisateurs de test -->
      <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
        <p class="text-sm text-blue-600 dark:text-blue-400 mb-2">
          <strong>{{ $t('login.testInfo.title') || 'Informations de test' }}:</strong>
        </p>
        <p class="text-xs text-blue-500 dark:text-blue-300">
          {{ $t('login.testInfo.description') || 'Utilisez n\'importe quel email des utilisateurs JSONPlaceholder avec le mot de passe "password"' }}
        </p>
        <p class="text-xs text-blue-500 dark:text-blue-300 mt-1">
          {{ $t('login.testInfo.example') || 'Exemple: Sincere@april.biz / password' }}
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('login.email') }}
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('login.emailPlaceholder')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ $t('login.password') }}
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
            Mot de passe oublié ?
          </a>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connexion...
          </span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          Pas encore de compte ?
          <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '../composables/useUsers'

const router = useRouter()
const { login, isLoading, error } = useUsers()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async () => {
  if (!form.email || !form.password) {
    return
  }

  const success = await login({
    email: form.email,
    password: form.password
  })

  if (success) {
    // Redirection vers la page demandée ou le dashboard
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || { name: 'Dashboard' })
  }
}
</script>