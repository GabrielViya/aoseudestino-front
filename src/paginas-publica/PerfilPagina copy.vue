<template>
    <TheTopo/>

    <div class="header-content">
        <header class="header">
            <br><br>
            <div>
                <!-- Adicionando a imagem da pessoa -->
                <div class="profile-image">
                    <img src="/foto1.jpg" alt="Foto de FERNANDO AUGUSTO ">
                </div>
                <h1>Perfil</h1>
                <p>(+244) 933102442</p>
                <p>Disponível</p>
            </div>
        </header>

        <main class="dados">
            <!-- Campo "nome" -->

               <h1>Fernando Augusto</h1>
            <p>009295HA042</p>
            <p>Lubango</p>
            <p>Lage</p>{{  }}


        </main>


    </div>
    <TheBarraMenu/>
    </template>

    <script>
    import TheBarraMenu from '@/components/TheBarraMenu.vue';
import TheTopo from '@/components/TheTopo.vue';
import axios from "axios"

    export default {
        components:{
            TheTopo,
            TheBarraMenu
        },

        data(){
            return {
               entregadores: []
            }
        },

        methods: {
            detalhar(){
                this.$router.push("/perfil")
            },

           
        },

        created(){
            
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

    .dados{

        padding:10px;
    }

    /* body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
        color: #333;
    } */

    .header {
        background-color: #333;
        color: #fff;
        padding: 20px 0;
        text-align: center;
    }




    .profile-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid #fff;
        margin:0 auto;
        overflow: hidden;

    }

    .profile-image img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .header-content h1 {
        margin-bottom: 10px;
    }

    .header-content p {
        margin: 5px 0;
    }

    main {
        margin: 20px 0;
    }

    .carga, .product, .location {
        background-color: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    h2 {
        margin-bottom: 10px;
    }

    /* Estilos para os campos de entrada */
    select, input[type="text"] {
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    input[type="text"]::placeholder {
        color: #999;
    }

    .request-button-container {
        text-align: center;
        margin-top: 20px;
    }

    .request-button {
        padding: 15px 30px;
        background-color: #28a745;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    .request-button:hover {
        background-color: #218838;
    }

    /*footer {
        text-align: center;
        margin-top: 20px;
        padding: 10px 0;
        background-color: #333;
        color: #fff;
    }*/

    .footer-content p {
        margin: 0;
    }
    </style>