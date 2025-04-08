import { createRouter, createWebHashHistory } from "vue-router";
import InicioPagina from "../paginas-publica/InicioPagina.vue";
import PerfilPagina from "@/paginas-publica/PerfilPagina.vue";
import HomePagina from "@/paginas-publica/HomePagina.vue";
import SolicitacaoPagina from "@/paginas-publica/SolicitacaoPagina.vue";
import PedidoPagina from "@/paginas-publica/PedidoPagina.vue";
import LoginPagina from "@/paginas-publica/LoginPagina.vue";
import CadastroPagina from "@/paginas-publica/CadastroPagina.vue";
import ClientePagina from "@/paginas-admin/ClientePagina.vue";
import ClienteAddPagina from "@/paginas-admin/ClienteaddPagina.vue";
import EncomendaPagina from "@/paginas-admin/EncomendaPagina.vue";
import FazerPedidoPagina from "@/paginas-publica/FazerPedidoPagina.vue";
import EntregadoresPagina from "@/paginas-publica/EntregadoresPagina.vue";
import PedidoEntregadorPagina from "@/paginas-publica/PedidoEntregadorPagina.vue"




const routes = [ 
    { path: '/', component: InicioPagina },
    {path: '/home', component:HomePagina},
    {path: '/solicitacao', component:SolicitacaoPagina},
    {path: '/perfil', component:PerfilPagina},
    {path: '/pedidos', component:PedidoPagina},
    {path: '/login', component:LoginPagina},
    {path: '/cadastro', component:CadastroPagina},
    {path: '/cliente', component:ClientePagina},
    {path: '/clienteadd', component:ClienteAddPagina},
    {path: '/encomenda', component:EncomendaPagina},
    {path: '/entregadores', component: EntregadoresPagina},
    {path: '/fazer-pedido', component: FazerPedidoPagina},
    {path: '/pedido-entregador', component: PedidoEntregadorPagina}
    
    


];

const router = createRouter({
    history: createWebHashHistory(),
    routes, // Usa 'routes' en lugar de 'rotas'
});

export default router; // Exporta el router correctamente