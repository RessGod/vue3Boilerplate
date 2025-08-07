<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4 text-xl">
      <nav class="mt-2">
        Task Manager
        <ul>
          <router-link :to='{ name: "Home" }'>Home</router-link>
          <router-link :to='{ name: "Login" }'>Login</router-link>
        </ul>
      </nav>
    </header>
    <main class="flex-1 p-4">
      <router-view /> <!-- affiche la vue correspondant à la route active -->
    </main>
  </div>
</template>

<style scoped></style>
