import { createApp } from 'vue'
import Toast, {POSITION} from 'vue-toastification'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "vue-toastification/dist/index.css"

createApp(App).use(router).use(Toast, {position: POSITION.BOTTOM_RIGHT}).mount('#app')
