<template>
  <TheTopo/>
    <div class="notifications-container">
      <br><br>
      <h1 class="page-title">Notificações ({{ notifications.length }})</h1>
      <div class="notifications-list">
        <div 
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-card"
          :class="{ visto: notification.status === 1 }" 
          @click="verNotificacao(notification.id)"
        >
          <div class="notification-content">
            <h3 class="notification-title">{{ notification.tipo_de_notificacao }}</h3>
            <p class="notification-message">{{ notification.descricao }}</p>
            <span class="notification-time">{{ notification.created_at }}</span>
          </div>
        </div>
      </div>
    </div>
    <br><br>
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
      notifications: [],
    }
  },

  methods: {
   
    async listarnotification() {
      try {
        let id = null
        if(localStorage.getItem("user")) {
          const user = JSON.parse(localStorage.getItem("user"))
          id = user.id
        }
        // Buscando os dados na API
        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_notificacoes?usuario_id="+id);

        // Colocando os dados na variável notifications
        this.notifications = response.data;

        console.log(this.notifications);

        const count = this.notifications.filter(n => n.status === 0).length;

        localStorage.setItem("totalNotif", count)

        if(localStorage.getItem("totalNotif")) {
            this.totalNotif = localStorage.getItem("totalNotif")

            if(this.totalNotif) {
                this.bgDanger = "bg-danger"
            } else {
                this.bgDanger = ""
            }
        }

        if(localStorage.getItem("totalNotif")) {
            this.totalNotif = localStorage.getItem("totalNotif")
        }

        // Atualiza o total de notificações com status 0
        this.updateTotalNotif();

      } catch (error) {
        console.error("Erro ao listar notificações:", error);
      }
    },

    // Detalhar e editar
    async verNotificacao(id) {
      
      const response = await axios.get("https://destino-api.crmcruzeiro.online/api/detalhar_notificacoes/"+id)

      const token = localStorage.getItem("token")

      // Clicar em notificação vamos mudar apenas o status
      const data = {
        ...response.data,
        status: '1'
      };

      try {
              // agora você pode usar `data` em outra requisição, ou onde precisar
            const response = await axios.put('https://destino-api.crmcruzeiro.online/api/atualizar_notificacoes/'+id, data, {
              headers: { Authorization: `Bearer ${token}` }
            });

            if(response) {
              this.listarnotification ()

              //Levar pra outra pagina apos clicar na notificação
              this.$router.push("/perfil")

            }
            
      } catch (error) {
        
      }
    },
  },

  created(){
    this.listarnotification ()

    if(localStorage.getItem("totalNotif")) {
      const storedTotalNotif = localStorage.getItem("totalNotif");
    }
  }
   
  }

</script>

  <style scoped>
  .notifications-container {
    padding: 2rem;
    background-color: #f0fff4;
    min-height: 100vh;
  }

  .visto {
    background-color: #f0f0f0 !important;
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