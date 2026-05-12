import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { currentLocale, setLocale, getMessages } from './i18n'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$t = (key) => {
  const messages = getMessages()
  return messages[key] || key
}
app.config.globalProperties.$currentLocale = currentLocale
app.config.globalProperties.$setLocale = setLocale
app.mount('#app')
