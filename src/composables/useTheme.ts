import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

// Initialiser le thème depuis localStorage ou système
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') as Theme
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  
  theme.value = savedTheme || systemTheme
  applyTheme(theme.value)
}

// Appliquer le thème au DOM
const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement
  
  if (newTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Watcher pour appliquer automatiquement les changements
watch(theme, (newTheme) => {
  applyTheme(newTheme)
  localStorage.setItem('theme', newTheme)
})

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    initTheme
  }
}