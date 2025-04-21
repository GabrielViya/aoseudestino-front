<template>
  <TheTopo/>
    <div class="notifications-container">
      <h1 class="page-title">Notificações</h1>
      <div class="notifications-list">
        <div 
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-card" 
        >
          <div class="notification-content">
            <h3 class="notification-title">{{ notification.tipo_de_notificacao }}</h3>
            <p class="notification-message">{{ notification.descricao }}</p>
            <span class="notification-time">{{ notification.created_at }}</span>
          </div>
        </div>
      </div>
    </div>
    <TheBarraMenu/>
  </template>
  
  

<script>
import TheBarraMenu from "@/components/TheBarraMenu.vue"
import TheTopo from "@/components/TheTopo.vue"
import axios from "axios"

export default {
  components: {
    TheBarraMenu,
    TheTopo
  },
  data() {
    return {
      notifications: []
    }
  },
  methods: {
   
    async listarnotification (){

      try {
        //   buscando os dados na api
          const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_notificacoes")
   
        //   colocando os dados na variavel entregadores
          this.notifications = response.data

          console.log(this.notifications)

      } catch (error) {
        
      }
    },


  },

  created(){
          this.listarnotification ()
      }
   
  }

</script>

  <style scoped>
  .notifications-container {
    padding: 2rem;
    background-color: #f0fff4;
    min-height: 100vh;
  }
  
  .page-title {
    color: #2d3748;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  
  .notifications-list {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .notification-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
    border-left: 4px solid;
  }
  
  .notification-card:hover {
    transform: translateX(5px);
  }
  
  .notification-card.unread {
    border-left-color: #48bb78;
  }
  
  .notification-card.request {
    border-left-color: #48bb78;
  }
  
  .notification-card.arrival {
    border-left-color: #38a169;
  }
  
  .notification-card.delivery {
    border-left-color: #2f855a;
  }
  
  .notification-card.alert {
    border-left-color: #c53030;
  }
  
  .notification-icon {
    font-size: 1.5rem;
    margin-right: 1.5rem;
    color: white;
}

</style>