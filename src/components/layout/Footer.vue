<template>
  <footer class="bg-gray-800 dark:bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Section À propos -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.about.title') }}</h3>
          <p class="text-gray-300 dark:text-gray-400 text-sm">
            {{ $t('footer.about.description') }}
          </p>
        </div>

        <!-- Section Liens -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.quickLinks.title') }}</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                :to="{ name: 'Dashboard' }"
                class="text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ $t('nav.dashboard') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Home' }"
                class="text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Login' }"
                class="text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors"
              >
                {{ $t('nav.login') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Section Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">{{ $t('footer.contact.title') }}</h3>
          <div class="text-gray-300 dark:text-gray-400 text-sm space-y-2">
            <p>{{ $t('footer.contact.email', { email: '[email]' }) }}</p>
            <p>{{ $t('footer.contact.phone', { phone: '[phone_number]' }) }}</p>
            <p>{{ $t('footer.contact.address', { address: '[address]' }) }}</p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-700 dark:border-gray-600 mt-8 pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            {{ $t('footer.copyright', { year: currentYear }) }}
          </p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
              {{ $t('footer.privacy') }}
            </a>
            <a href="#" class="text-gray-400 hover:text-white text-sm transition-colors">
              {{ $t('footer.terms') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>