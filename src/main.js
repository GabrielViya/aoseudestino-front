// main.js
import { createApp } from 'vue'
import App from './App.vue'
import rota from './rotas/router'

// Importa CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Importa o JavaScript do Bootstrap (que depende de Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Ícones do Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importa Notyf
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

// Cria instância global do Notyf
// const notyf = new Notyf()

const notyf = new Notyf({
  duration: 3000, // tempo padrão de exibição
  ripple: true,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'success',
      background: 'green',
      icon: false,
      dismissible: false // ✅ sucesso sem botão de fechar
    },
    {
      type: 'error',
      background: 'indianred',
      icon: false,
      dismissible: true // ✅ erro com botão de fechar
    }
  ]
})
  

const app = createApp(App)

app.config.globalProperties.$notyf = notyf

// Como usar o alert

// Usar este para sucesso
// this.$notyf.open({ type: 'success', message: 'Salvo com sucesso!' })

// Usar este para erro
// this.$notyf.open({ type: 'error', message: 'Falha ao salvar!' })
// this.$notyf.open({ type: 'error', message: 'Falha ao salvar!' })

app.use(rota)

app.mount('#app')
