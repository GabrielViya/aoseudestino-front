import { createApp } from 'vue'
import App from './App.vue'
import rota from './rotas/router'

// Importa os ícones do Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(rota)

app.mount('#app')
