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
                <div class="row justify-content-space-between">
                    <button class="col filter-button mb-3" data-status="on-process">
                        <i class="fas fa-truck-moving"></i> Em Processo
                    </button>
                    <button class="col mx-2 filter-button mb-3" data-status="pending">
                        <i class="fas fa-clock"></i> Aceite
                    </button>
                    <button class="col filter-button mb-3" data-status="delivered">
                        <i class="fas fa-check-circle"></i> Entregue
                    </button>
                    <button class="col-12 filter-button active d-flex justify-content-center" data-status="all">
                        <i class="fas fa-list"></i> Todos
                    </button>
                </div>
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
                    <div class="d-flex justify-content-space-between">
                        <button @click="detalhar(item.id)" class="detalhar-btn">Detalhar</button>
                        <button @click="SolicitarEntregador(item.id)" class="solicitar-btn">Solicitar</button>
                        <button @click="Solicitados()" class="solicitado-btn">Solicitados (0)</button>
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
               
               cliente_id: []
              
            }
        },
    
        methods:{
            async buscarCliente(){
                try {
                    let user = null

                    if(localStorage.getItem("user"))
                    {
                        user = JSON.parse(localStorage.getItem("user"))    
                    }

                    const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_cliente?id_usuario="+user.id)
    
                    console.log(response.data.data.data[0])

                    this.cliente_id = response.data.data.data[0].id

                    try {
                        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_pedido?id_cliente="+this.cliente_id)
                        this.pedidos = response.data 

                        console.log(this.pedidos)
                    } catch (error) {
                        
                    }
                    
                } catch (error) {
                    
                }
            },
     
            detalhar(id){
                this.$router.push("/detalhar-pedido/"+id)
            },
            
            // async listar (){
                
                
            //     if(this.buscarCliente()) {
            //         //   buscando os dados na api
            //         const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_pedido?id_cliente="+this.cliente_id)
            //         this.pedidos = response.data
      
      
            //         console.log(this.pedidos)
            //     }
       
            // //   colocando os dados na variavel entregadores
            // },

            SolicitarEntregador(id){
                this.$router.push("/entregadores/"+id)
            },

            async Solicitados() {
                try {
                    const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_solicitacao")
                    
                    console.log(response)

                } catch (error) {
                    
                }
            }

        },
        
        
        created(){
            // this.listar()
            this.buscarCliente()
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
.solicitado-btn {
    background-color: #15b6c2;
    color: #333333; 
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
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