import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

// axios.defaults.baseURL = 'https://cp.wordlebot.uz'
// axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.defaults.baseURL = 'https://mirodil.pythonanywhere.com/'
createApp(App).use(store).use(router, axios).mount('#app')
