<template>
    <TheTopo/>
    
    
    <div class="container-fluid p-0">
        <!-- Header com breadcrumb -->
        <div class="bg-success text-white p-3" style="margin-top: 47px;">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <p>
                        Pedido #{{ id }}
                    </p>
                </nav>
                <h1 class="mt-2">Detalhes do Pedido</h1>
            </div>
        </div>

        <main class="container my-4">
            <!-- Lista de produtos -->
            <div class="card border-success mb-4">
                <div class="card-header bg-light">
                    <h5 class="mb-0 text-success"><i class="fas fa-box-open"></i>Produtos</h5>
                </div>
                <div class="card-body p-0">
                    <div class="list-group list-group-flush">
                        <div v-for="item in produtos" :key="item.id" 
                             class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <!-- <img :src="produto.imagem" :alt="produto.nome" 
                                     class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;"> -->
                                <div>
                                    <h6 class="mb-1">{{ item.produto }}</h6>
                                    <small class="text-muted">Quantidade: {{ item.quantidade }}</small>
                                </div>
                            </div>
                            <!-- <span class="text-success fw-bold">R$ {{ produto.preco }}</span> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Localização de entrega -->
            <!-- <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card border-success h-100">
                        <div class="card-header bg-light">
                            <h5 class="mb-0 text-success"><i class="fas fa-map-marker-alt me-2"></i>Endereço de Entrega</h5>
                        </div>
                        <div class="card-body">
                            <p class="mb-1">{{ pedido.endereco.nome }}</p>
                            <p class="mb-1">{{ pedido.endereco.rua }}, {{ pedido.endereco.numero }}</p>
                            <p class="mb-1">{{ pedido.endereco.bairro }}</p>
                            <p class="mb-1">{{ pedido.endereco.cidade }} - {{ pedido.endereco.estado }}</p>
                            <p class="mb-0">CEP: {{ pedido.endereco.cep }}</p>
                        </div>
                    </div>
                </div>
            </div> -->


            <!-- Ações -->
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
                <!-- <button class="btn btn-outline-success me-md-2">
                    <i class="fas fa-print me-2"></i>Imprimir Pedido
                </button> -->
                <button class="btn btn-success" @click="acompanharEntrega()">
                    <i class="fas fa-truck me-2"></i>Acompanhar Entrega
                </button>
            </div>
            <br><br><br>
        </main>
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
           produtos: [],
           id: null
        }
    },

    methods: {
        async listar (){
            //   buscando os dados na api
            const id = this.$route.params.id
            const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_produto?id_pedido="+id)
           
            //   colocando os dados na variavel entregadores
            this.produtos = response.data.data
            
            console.log(this.produtos)
        },

        acompanharEntrega() {
            this.$router.push("/mapa")
        }
    },

    created() {
        this.id = this.$route.params.id
        this.listar()
    }
}
</script>

<style scoped>
/* Estilos personalizados */
.breadcrumb {
    background-color: transparent;
    padding: 0;
}

.breadcrumb-item a {
    text-decoration: none;
}

.card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
}

.img-thumbnail {
    border-radius: 8px;
}

/* Estilo para a linha do tempo */
.timeline {
    position: relative;
    padding-left: 30px;
}

.timeline-item {
    position: relative;
    padding-bottom: 20px;
}

.timeline-marker {
    position: absolute;
    left: -30px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #dee2e6;
    top: 0;
}

.timeline-item.active .timeline-marker {
    background-color: #28a745;
    box-shadow: 0 0 0 4px rgba(40, 167, 69, 0.2);
}

.timeline-content {
    padding-left: 15px;
}

.timeline-item:not(:last-child)::after {
    content: '';
    position: absolute;
    left: -21px;
    top: 20px;
    bottom: 0;
    width: 2px;
    background-color: #dee2e6;
}

.timeline-item.active:not(:last-child)::after {
    background-color: #28a745;
}

/* Responsividade */
@media (max-width: 768px) {
    .card-header h5 {
        font-size: 1.1rem;
    }
    
    .list-group-item {
        /* flex-direction: column; */
        align-items: flex-start;
    }
    
    .list-group-item img {
        margin-bottom: 10px;
    }
}
</style>