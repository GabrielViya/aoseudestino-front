import { createApp } from 'vue'
import App from './App.vue'
import rota from './rotas/router'

const app=createApp(App)

app.use(rota)

app.mount('#app')


