<template>
     <header class="fixed-header">
        <div style="position: fixed; top: 24px; left: 20px;">
            <router-link to="/notificacoes">
                <div style="position: relative;">
                    <div style="width: 20px; height: 20px; background: red; border-radius: 50%; position: absolute; top: -10px; left: 5px; display: flex; justify-content: center; align-items: center; color: #fff;">
                        <img src="/logo.jpeg" alt="" width="40" style="border-radius: 8px;">
                    </div>
                </div>
            </router-link>
        </div>  
            
        <h1>AgroEntrega</h1>
        
        <div style="position: fixed; top: 15px; right: 20px;">
            <router-link to="/notificacoes">
                <div style="position: relative;">
                    <i class="bi bi-bell-fill" style="font-size: 18px; color: #fff;"></i>
                    <div v-if="totalNotif != 0" style="width: 20px; height: 20px; border-radius: 50%; position: absolute; top: -10px; left: 5px; display: flex; justify-content: center; align-items: center; color: #fff;" :class="bgDanger">
                        {{ totalNotif }}
                    </div>
                </div>
            </router-link>
        </div>    
        </header>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      notifications: [],
      totalNotif: null,
      bgRed: ""
    };
  },

  methods: {
    async listarnotification() {
      try {
        // Buscando os dados na API
        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_notificacoes");

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

        // Atualiza o total de notificações com status 0
        this.updateTotalNotif();

      } catch (error) {
        console.error("Erro ao listar notificações:", error);
      }
    },

    updateTotalNotif() {
      // Conta as notificações com status 0 e atualiza no localStorage
      const count = this.notifications.filter(n => n.status === 0).length;
      localStorage.setItem("totalNotif", count);
    },
  },

  created() {
    this.listarnotification();

  },

};
</script>


<style>
    /* Cabeçalho fixo */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #45a049;
    color: #fff;
    padding: 10px 0 !important;
    text-align: center;
    z-index: 1000;
}

.fixed-header h1 {
    margin: 0;
    font-size: 1.5rem;
}

.fixed-header input {
    width: 90%;
    padding: 8px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
}

</style>