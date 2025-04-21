<template>
     <footer>
            <ul>
                <li>
                    <router-link to="/home">
                        <i class="bi bi-house-door-fill"></i><span>Início</span>
                    </router-link>
                </li>
                <li> 
                    <router-link :to="pedido_url">
                        <i class="bi bi-box-seam-fill"></i><span>Meus Pedidos</span>
                    </router-link>

                </li>
                <li> 
                    <router-link to="/mensagens">
                        <i class="bi bi-chat-dots-fill"></i><span>Mensagens</span>
                    </router-link>

                    
                </li>

                <li><router-link to="/perfil"><i class="bi bi-person-fill"></i><span>Perfil</span></router-link></li> 
                   
            </ul>
        </footer>
</template>

<script>
    export default {
        data() {
            return {
                pedido_url: ""
            }
        },

        created() {
            
            if(localStorage.getItem('user')) {
                const user = JSON.parse(localStorage.getItem('user'))
                if(user.perfil == "cliente") {
                    this.pedido_url = "/pedidos"
                } else {
                    this.pedido_url = "/pedido-entregador"
                }
            }
        }
    }
</script>

<style scoped>

/* Barra de navegação inferior */
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #45a049;
    z-index: 1000;
}

footer ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
    padding: 10px 0;
    margin: 0;
}

footer ul li a {
    text-decoration: none;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9rem;
}

footer ul li a i {
    font-size: 1.2rem;
    margin-bottom: 5px;
}

footer ul li a span {
    font-size: 0.8rem;
}
</style>
