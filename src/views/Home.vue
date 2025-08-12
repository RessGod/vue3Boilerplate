<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Header spécifique landing -->
    <LandingHeader />
    
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            {{ $t('landing.badge') || '✨ Nouveau - Version 2.0 disponible' }}
          </div>

          <!-- Main heading -->
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {{ $t('landing.hero.title') || 'Gérez vos projets' }}
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
              {{ $t('landing.hero.titleHighlight') || 'avec simplicité' }}
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {{ $t('landing.hero.subtitle') || 'La plateforme tout-en-un pour optimiser votre productivité et collaborer efficacement avec votre équipe.' }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <router-link
              :to="{ name: 'Login' }"
              class="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {{ $t('landing.cta.primary') || 'Commencer gratuitement' }}
            </router-link>
            
            <button class="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-lg font-semibold rounded-xl border border-gray-300 dark:border-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ $t('landing.cta.secondary') || 'Voir la démo' }}
            </button>
          </div>

          <!-- Social proof -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
              {{ $t('landing.socialProof') || 'Utilisé par plus de 10,000+ équipes dans le monde' }}
            </p>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">10k+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ $t('landing.stats.users') || 'Utilisateurs' }}</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">99.9%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ $t('landing.stats.uptime') || 'Disponibilité' }}</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ $t('landing.stats.countries') || 'Pays' }}</div>
              </div>
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">4.9★</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ $t('landing.stats.rating') || 'Note moyenne' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ $t('landing.features.title') || 'Tout ce dont vous avez besoin' }}
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ $t('landing.features.subtitle') || 'Des outils puissants pour transformer votre façon de travailler' }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('landing.features.analytics.title') || 'Analytics Avancés' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('landing.features.analytics.description') || 'Visualisez vos données avec des graphiques interactifs et des rapports détaillés.' }}
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('landing.features.collaboration.title') || 'Collaboration' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('landing.features.collaboration.description') || 'Travaillez en équipe avec des outils de collaboration en temps réel.' }}
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ $t('landing.features.security.title') || 'Sécurité' }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t('landing.features.security.description') || 'Vos données sont protégées avec un chiffrement de niveau entreprise.' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t('landing.finalCta.title') || 'Prêt à transformer votre productivité ?' }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('landing.finalCta.subtitle') || 'Rejoignez des milliers d\'équipes qui font déjà confiance à notre plateforme.' }}
        </p>
        <router-link
          :to="{ name: 'Login' }"
          class="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          {{ $t('landing.finalCta.button') || 'Commencer maintenant' }}
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import LandingHeader from '../components/layout/LandingHeader.vue'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>