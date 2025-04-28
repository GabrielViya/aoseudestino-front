<template>

<TheTopo/>
<br><br>
    <div class="chat-container">
      <!-- Sidebar de contatos -->
      <div class="sidebar">
        <h2>Conversas</h2>
        <ul>
          <li class="active" @click="acionarExibirMsg">
            <img src="https://i.pravatar.cc/40?img=3" />
            João - Cliente
          </li>
          <li class="active">
            <img src="https://i.pravatar.cc/40?img=4" />
            Maria - Transportadora
          </li>
        </ul>
      </div>
    </div>

    <div class="fundo" :class="{'exibir-msg':exibirMsg}" @click="acionarExibirMsg">
                        <!-- <div class="send-button" @click="sendSMS">
                            <span class="send-icon">&gt;</span>
                        </div> -->
                        <div class="contente-msg">
                                <div class="contente-barra-msg">
                                    <div class="barra-msg" @click="acionarExibirMsg"></div>
                                    
                                </div>
                                <div style="padding-top: 15px; text-align: center;">
                                    <i class="bi bi-telephone-outbound-fill"></i> 927860828<br>
                                </div>
                                <div class="ver-msg">
                                    <div class="cliente-msg" v-for="item in this.mensagens" :key="item.id">
                                        <div class="cliente-box-msg">
                                            {{ item.ultima_mensagem.conteudo }}
                                        </div>
                                    </div>
                                    <!-- <div class="entregador-msg">
                                        <div class="entregador-box-msg">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis id temporibus deserunt velit minima atque laudantium amet distinctio iste nemo eveniet veniam perspiciatis et voluptatem ex repudiandae, libero doloribus facere?
                                        </div>
                                    </div> -->
                                </div>
                                <div class="enviar-msg">
                                   <div>
                                    <input type="text" placeholder="conversar" v-model="conteudoMsg">
                                    <i class="bi bi-send-fill" @click="enviarMsg"></i>
                                   </div>
                                </div>
                            </div>
                    </div>

    <TheBarraMenu/>
  </template>

<script>
  import TheBarraMenu from '@/components/TheBarraMenu.vue';
  import TheTopo from '@/components/TheTopo.vue';

  export default {
        components:{
                TheTopo,
                TheBarraMenu, 
                name: 'ChatHistory',
            
        },

        data() {
          return {
            mensagens: [],
            exibirMsg:false,
            conteudoMsg:"",
            id_entregador: "",
            getEvent: ""
          }
        },

        methods: {
          acionarExibirMsg(event) {
            if (event.target === event.currentTarget) { // Só executa se o clique for no .fundo
              this.exibirMsg = !this.exibirMsg;
            }
          },

          async listarMsg () {
            console.log("Olá mundo")
            //   buscando os dados na api
            try {
              const token = localStorage.getItem("token");

              const response = await axios.get("https://destino-api.crmcruzeiro.online/api/conversas", {
                headers: {
                  Authorization: `Bearer ${token}`
                  }
              });

              //   colocando os dados na variavel entregadores
              this.mensagens = response.data.data
        
              } catch (error) {
                    
              }
            },
        },

        created() {
          console.log("Componente foi montado");
          this.listarMsg();
        }

  }
</script>
  
<style scoped>
  .chat-container {
    display: flex;
    height: calc(100vh - 100px); /* ajuste para o topo e menu */
    font-family: 'Segoe UI', sans-serif;
    background-color: #f5f5f5;
  }
  
  /* Sidebar */
  .sidebar {
    background-color: #e8f5e9;
    /* border-right: 1px solid #c8e6c9; */
    padding: 15px;
    box-sizing: border-box;
    overflow-y: auto;
    width: 100%;
  }
  
  .sidebar h2 {
    font-size: 18px;
    color: #388e3c;
    margin-bottom: 15px;
  }

  .ver-msg{
    padding: 10px 15px;
    height: 300px;
    overflow: auto;
}

.cliente-msg{
    display: flex;
    justify-content: end;
}
.enviar-msg{
    padding: 5px;
}
.cliente-box-msg{
    background-color: #4be47b;
}
.exibir-msg{
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
}
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .sidebar li:hover,
  .sidebar li.active {
    background-color: #c8e6c9;
  }
  
  .sidebar li img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  /* Chat */
  .chat-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
  
  .chat-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background-color: #a5d6a7;
    border-bottom: 1px solid #81c784;
  }
  
  .chat-header img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .chat-header h3 {
    font-size: 18px;
    color: #2e7d32;
    margin: 0;
  }
  
  /* Mensagens */
  .messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9fbe7;
  }
  
  .message.sent {
    background-color: #c8e6c9;
    align-self: flex-end;
    text-align: right;
  }
  
  .message.received {
    background-color: #f1f8e9;
    align-self: flex-start;
  }
  
  .time {
    display: block;
    font-size: 0.75em;
    margin-top: 5px;
    color: #666;
  }

/* Estilo msg */

.fundo{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(300px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;
}
.exibir-msg{
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
}

.contente-msg{
    position: fixed;
    width: 100%;
    height: 600px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #dfeedd;
    bottom: 0;
}

.contente-barra-msg{
    padding: 5px 0;
    padding-top: 20px;
}

.barra-msg{
    width: 150px;
    height: 3px;
    margin: 0 auto; 
    background-color: #f9f9f9;
}

.ver-msg{
    padding: 10px 15px;
    height: 375px;
    overflow: auto;
}
.enviar-msg{
    padding: 5px;
}
.enviar-msg div {
    border: 1px solid #b1b1b1;
    border-radius: 20px;
}
.enviar-msg input{
    border: none;
    background: none;
    padding: 10px;
    height: 30px;
    width: 80%;
}
.enviar-msg input:focus{
    outline: none;
    border: none;
}
.cliente-msg{
    display: flex;
    justify-content: end;
}
.entregador-msg{
    display: flex;
    justify-content: start;
}
.cliente-box-msg, .entregador-box-msg{
    max-width: 80%;
    margin: 10px 0;
    background-color: #b4b3b3;
    border-radius: 20px;
    padding: 15px;
    font-size: 18px;
    font-family: Arial, sans-serif;

}

.cliente-box-msg{
    background-color: #4be47b;
}
.telefone-msg{
    padding: 10px 0;
    text-align: center;
    padding-bottom: 3px;
}
</style>
  