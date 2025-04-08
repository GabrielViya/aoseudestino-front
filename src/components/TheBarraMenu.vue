<template>
     <footer>
            <ul>
                <li>
                    <router-link to="/home">
                        <i class="fas fa-home"></i><span>Início</span>
                    </router-link>
                </li>
                <li> 
                    <router-link to="/pedidos">
                        <i class="fas fa-box"></i><span>Meus Pedidos</span>
                    </router-link>

                    
                </li>
                <li> 
                    <router-link to="/notificacao">
                        <i class="fas fa-bell"></i><span>Notificações</span>
                    </router-link>

                    
                </li>

                <li><router-link to="/perfil"><i class="fas fa-user"></i><span>Perfil</span></router-link></li> 
                   
            </ul>
        </footer>
</template>

<script>

</script>

<style scoped>

/* Barra de navegação inferior */
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #28a745;
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
