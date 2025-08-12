<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- En-tête du dashboard -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('dashboard.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-300">
        {{ $t('dashboard.welcome') }}
        <span v-if="currentUser" class="font-medium text-primary-600 dark:text-primary-400">
          {{ currentUser.name }}
        </span>
      </p>
    </div>

    <!-- Cartes de statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div :class="stat.iconBg" class="p-3 rounded-lg">
              <component :is="stat.icon" class="h-6 w-6 text-white" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
        </div>
        <div class="mt-4">
          <div class="flex items-center text-sm">
            <span :class="stat.changeColor" class="font-medium">
              {{ stat.change }}
            </span>
            <span class="text-gray-500 ml-2">depuis le mois dernier</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal du dashboard -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Graphique des activités récentes -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Activités récentes</h2>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center p-3 bg-gray-50 rounded-lg"
          >
            <div :class="activity.iconBg" class="p-2 rounded-full mr-3">
              <component :is="activity.icon" class="h-4 w-4 text-white" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tâches à faire -->
      <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Tâches à faire</h2>
        <div class="space-y-3">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task.id)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
            />
            <div class="flex-1">
              <p
                :class="task.completed ? 'line-through text-gray-500' : 'text-gray-900'"
                class="text-sm font-medium"
              >
                {{ task.title }}
              </p>
              <p class="text-xs text-gray-500">{{ task.dueDate }}</p>
            </div>
            <span
              :class="task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'"
              class="px-2 py-1 text-xs font-medium rounded-full"
            >
              {{ task.priority === 'high' ? 'Haute' : 
                 task.priority === 'medium' ? 'Moyenne' : 'Basse' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Section graphiques -->
    <div class="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Aperçu des performances</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">85%</div>
          <p class="text-sm text-gray-600">Taux de completion</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600 mb-2">42</div>
          <p class="text-sm text-gray-600">Projets actifs</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600 mb-2">1.2k</div>
          <p class="text-sm text-gray-600">Utilisateurs actifs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUsers } from '../composables/useUsers'

const { currentUser } = useUsers()

// Icônes SVG simples
const UserIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>`
}

const ChartIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>`
}

const DocumentIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>`
}

const CashIcon = {
  template: `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path></svg>`
}

// Données des statistiques
const stats = ref([
  {
    title: 'Utilisateurs totaux',
    value: '2,543',
    change: '+12%',
    changeColor: 'text-green-600',
    icon: UserIcon,
    iconBg: 'bg-blue-500'
  },
  {
    title: 'Revenus',
    value: '€45,231',
    change: '+8%',
    changeColor: 'text-green-600',
    icon: CashIcon,
    iconBg: 'bg-green-500'
  },
  {
    title: 'Commandes',
    value: '1,234',
    change: '-3%',
    changeColor: 'text-red-600',
    icon: DocumentIcon,
    iconBg: 'bg-yellow-500'
  },
  {
    title: 'Taux de conversion',
    value: '3.24%',
    change: '+5%',
    changeColor: 'text-green-600',
    icon: ChartIcon,
    iconBg: 'bg-purple-500'
  }
])

// Activités récentes
const recentActivities = ref([
  {
    id: 1,
    title: 'Nouveau utilisateur inscrit',
    time: 'Il y a 2 minutes',
    icon: UserIcon,
    iconBg: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Commande #1234 traitée',
    time: 'Il y a 15 minutes',
    icon: DocumentIcon,
    iconBg: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Rapport mensuel généré',
    time: 'Il y a 1 heure',
    icon: ChartIcon,
    iconBg: 'bg-purple-500'
  }
])

// Tâches
const tasks = reactive([
  {
    id: 1,
    title: 'Réviser le rapport mensuel',
    dueDate: 'Échéance: Aujourd\'hui',
    priority: 'high',
    completed: false
  },
  {
    id: 2,
    title: 'Mettre à jour la documentation',
    dueDate: 'Échéance: Demain',
    priority: 'medium',
    completed: false
  },
  {
    id: 3,
    title: 'Planifier la réunion équipe',
    dueDate: 'Échéance: Cette semaine',
    priority: 'low',
    completed: true
  },
  {
    id: 4,
    title: 'Optimiser les performances',
    dueDate: 'Échéance: Vendredi',
    priority: 'high',
    completed: false
  }
])

// Fonction pour basculer l'état d'une tâche
const toggleTask = (taskId: number) => {
  const task = tasks.find(t => t.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
}
</script>