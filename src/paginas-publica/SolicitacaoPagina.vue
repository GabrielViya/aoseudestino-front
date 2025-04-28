<template>
    <TheTopo/>

    <header class="header-pedido">
        <div>
            <br><br><br>
            <h1>Meus Pedidos</h1>
            <p>Rastreie seus pedidos de forma simples e rápida.</p>
            
        </div>
    </header>

    <main>
        <!-- Campo para inserir o número de rastreamento -->

        <!-- Filtros de status -->
        <section class="order-filters">
            <h2>Filtrar por Status</h2>
            <div class="filters">
                <button class="filter-button active" data-status="all">
                    <i class="fas fa-list"></i> Todos
                </button>
                <button class="filter-button" data-status="pending">
                    <i class="fas fa-clock"></i> Aceite
                </button>
                <button class="filter-button" data-status="on-process">
                    <i class="fas fa-truck-moving"></i> Em Processo
                </button>
                <button class="filter-button" data-status="delivered">
                    <i class="fas fa-check-circle"></i> Entregue
                </button>
            </div>
        </section>

        <!-- Lista de resultados -->
        <section class="order-results">
            <h2>({{ solicitacoes.length }}) Solicitações</h2><br>
            <div class="results-list">
                <!-- Exemplo de item de pedido -->
               
                <div v-for="item in solicitacoes" :key="item.id" class="order-item" data-status="pending">
                    <!-- <h3>{{ item.produto }}</h3> -->
                    <p>Status: <span class="status pending">{{ item.status }}</span></p>
                    <p>{{ item.created_at }}</p>
                    <br> 
                    <div style="display: flex; justify-content: space-between;">
                        <button @click="detalhar(item.id_pedido)" class="Negociar-btn Ver-btn" style="background: grey; padding: 0 35px;">Detalhar</button>
                        <button @click="acionarExibirMsg" class="Negociar-btn">Responder</button>
                        <button @click="Rejeitar()" class="Rejeitar-btn">Rejeitar</button>
                    </div>
                    <div>
                        <button @click="Aceitar()" class="Aceitar-btn" style="width: 100%; margin: 0; margin-top: 10px;">Aceitar</button>
                    </div>
                </div>
                    
               
                <!-- Adicione mais itens conforme necessário -->
            </div>
        </section>

        <!-- Informações sobre entrega -->
        <section class="delivery-info">
            <h2>Entrega Segura</h2>
            <div class="delivery-content">
                <i class="fas fa-truck"></i>
                <p>Nossa entrega garante que seus Produtos Agrícolas sejam entregues em perfeitas condições.</p>
                <p>Método de Pagamento: <strong>Pagamento na Entrega</strong> </p>
            </div>
        </section>

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
    </main>

    <br><br><br><br>

    <TheBarraMenu/>
</template>

<script>
import TheBarraMenu from "@/components/TheBarraMenu.vue"
import TheTopo from "@/components/TheTopo.vue"
import axios from "axios"

export default{
    components: {
        TheBarraMenu,
        TheTopo
    },
    
    data(){
            return {
                solicitacoes: [
                    {produto: ""}
                ],
                entregador_id: "",
                mensagens: [],
                exibirMsg:false,
                conteudoMsg:"",
                id_entregador: "",
                getEvent: "" 
            }
        },
    
        methods:{
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
     
            detalhar(id_pedido){
                this.$router.push("/detalhar-pedido/"+id_pedido)
            },

            async buscarEntregador(){
                try {
                    let user = null

                    if(localStorage.getItem("user"))
                    {
                        user = JSON.parse(localStorage.getItem("user"))    
                    }

                    const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_entregador?id_usuario="+user.id)
    
                    console.log(response.data.data.data[0])

                    this.entregador_id = response.data.data.data[0].id

                    // alert(this.entregador_id)

                    try {
                        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_solicitacao?id_entregador="+this.entregador_id)

                        this.solicitacoes = response.data.data

                    } catch (error) {
                        
                    }
                    
                } catch (error) {
                    
                }
            },

            SolicitarEntregador(id){
                this.$router.push("/entregadores")
            }

        },
        
        
        created(){
            this.buscarEntregador()
        }
    }

</script>


<style scoped>
/* Reset básico */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
    padding: 20px;
}

.header-pedido {
    background: linear-gradient(135deg, #333, #555);
    color: #fff;
    padding: 20px 15px;
    text-align: center;
    border-bottom: 5px solid #28a745;
}

.header-pedido h1 {
    margin-bottom: 10px;
    font-size: 2.5em;
}

.header-pedido p {
    font-size: 1.2em;
}

main {
    margin: 20px 0;
}

section {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

h2 {
    margin-bottom: 15px;
    font-size: 1.5em;
    color: #333;
}

.track-order .track-input {
    display: flex;
    gap: 10px;
}

.track-order input {
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.track-order button {
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}

.track-order button:hover {
    background-color: #218838;
}

.order-filters .filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-button {
    padding: 10px 20px;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}

.filter-button.active {
    background-color: #28a745;
    color: #fff;
    border-color: #28a745;
}

.order-results .results-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.order-item {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
}

.order-item h3 {
    margin-bottom: 10px;
}

.order-item .status {
    font-weight: bold;
}

.order-item .status.pending {
    color: #dc3545;
}

.order-item .status.on-process {
    color: #ffc107;
}

.order-item .status.delivered {
    color: #28a745;
}

.delivery-info .delivery-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.delivery-info i {
    font-size: 2em;
    color: #28a745;
}

.account-options {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.account-options button {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
}

.account-options button:hover {
    background-color: #555;
}
.ver-btn {
    background-color: #cccccc;
    color: #333333; 
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    /* margin-right: 10px; */
}
.Negociar-btn {
    background-color: #15b6c2;
    color: #333333; 
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    /* margin-left: 10px; */
}
.Aceitar-btn {
    background-color: #28a745; 
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
.Rejeitar-btn {
    background-color: red;
    color: black; 
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    /* margin-left: 6px; */
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