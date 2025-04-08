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
        <!-- <section class="track-order">
            <h2>Insira o Número de Rastreamento</h2>
            <div class="track-input">
                <input type="text" id="track-number" placeholder="Digite o número de rastreamento">
                <button id="track-button">
                    <i class="fas fa-search"></i> Rastrear
                </button>
            </div>
        </section> -->

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
            <h2>({{ pedidos.length }}) Pedidos</h2><br>
            <div class="results-list">
                <!-- Exemplo de item de pedido -->
               
                <div v-for="item in pedidos" :key="item.id" class="order-item" data-status="pending">
                    <!-- <h3>{{ item.produto }}</h3> -->
                    <p>Status: <span class="status pending">{{ item.status }}</span></p>
                    <p>{{ item.created_at }}</p>
                    <br> 
                    <button @click="detalhar()" class="detalhar-btn">Detalhar</button>
                    <button @click="SolicitarEntregador(item.id)" class="solicitar-btn">Solicitar Entregador</button>
                </div>

               
                <!-- Adicione mais itens conforme necessário -->
            </div>
        </section>

        <!-- Informações sobre entrega -->
        <section class="delivery-info">
            <h2>Entrega Segura</h2>
            <div class="delivery-content">
                <i class="fas fa-truck"></i>
                <p>Nossa entrega garante que seus itens sejam entregues diretamente na sua porta.</p>
                <p>Métodos de Pagamento: <strong>Pagamento na Entrega</strong> ou <strong>Pagamento Online</strong>.</p>
            </div>
        </section>

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
               pedidos: [
                
                {produto: ""}
               ],    
               
              
            }
        },
    
        methods:{
              
     
            detalhar(){
                this.$router.push("/pedidos")
            },
            
            async listar (){
            //   buscando os dados na api
              const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_pedido")
       
            //   colocando os dados na variavel entregadores
              this.pedidos = response.data


              console.log(this.pedidos)
            },

            SolicitarEntregador(id){
                this.$router.push("/entregadores")
            }

        },
        
        
        created(){
            this.listar()
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
.detalhar-btn {
    background-color: #cccccc;
    color: #333333; 
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}
.solicitar-btn {
    background-color: #28a745; 
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}



</style>