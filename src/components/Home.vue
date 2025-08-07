<script setup>
    import { ref } from 'vue'
    const userName = ref('RS')
</script>

<template>
  <h2 class="text-2xl font-bold">Bienvenue, {{ userName }}</h2>
</template>
