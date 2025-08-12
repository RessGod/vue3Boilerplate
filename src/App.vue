<template>
  <component :is="currentLayout">
    <router-view /> <!-- affiche la vue correspondant à la route active -->
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import Layout from './components/layout/Layout.vue'
  import LandingLayout from './components/layout/LandingLayout.vue'
  
  const route = useRoute()
  
  // Utiliser le layout landing pour la page d'accueil, layout standard pour les autres
  const currentLayout = computed(() => {
    return route.name === 'Home' ? LandingLayout : Layout
  })
</script>

<style scoped></style>
