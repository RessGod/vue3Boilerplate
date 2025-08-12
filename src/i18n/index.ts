import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import mg from './locales/mg.json'

const messages = {
  fr,
  mg
}

const i18n = createI18n({
  legacy: false,
  locale: 'fr', 
  fallbackLocale: 'fr',
  messages
})

export default i18n