import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth } from './firebase/config'
import { useAuthStore } from './stores/auth'
import router from './router'
import './style.css'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth state
auth.onAuthStateChanged((user) => {
  const authStore = useAuthStore()
  authStore.setUser(user)
})

app.mount('#app')