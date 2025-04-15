<template>
    <br><br>
    <TheTopo/>
  
      <div class="bg-gradient container" style="height: 90vh; overflow: hidden !important;">
          <!-- <div class="grass"></div> -->
  
          <div class="content">
            <div class="texto">
                <h1>Serviços de<br>Entrega de<br>Produtos Agrícolas</h1>
            </div>
              
              <img src="/jp1.png" alt=" ">
              <div  style="position: fixed; left: 50%; transform: translateX(-50%); bottom: 85px;">
                <router-link to="/fazer-pedido" class="btn">Fazer Pedido</router-link>
                <router-link to="/login" class="btn btn-entrar" v-show="btnEntrar">Entrar</router-link>
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
    },
    data() {
            return {
               btnEntrar:true 
                    
       }
    },
    methods: {
      fazerPedido() {
        // Lógica para fazer o pedido
        alert('Pedido realizado com sucesso!');
      }
    },

    created(){ 
      if(localStorage.getItem('user')){
        this.btnEntrar=false
      }
    }
  }
  </script>
  
  <style scoped>
 
  body {
    margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
      overflow: hidden;
  }
  .bg-gradient{
    background: rgb(140,171,204);
    background: linear-gradient(179deg, rgba(140,171,204,1) 0%, rgba(39,226,244,0.6662980621936274) 57.99999999999999%, rgba(68,76,44,1) 100%);
  }
  .texto{
    padding: 30px 10px;
  }
  .container {
      height: 90v;
      overflow: hidden;
      
  }
  
  .container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
  }
  
  /* Caminhão animado */
  
  /* Conteúdo principal */
  .content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #fff;
      text-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  }
  
  h1 {
      font-size: 1.5em !important;
      margin-bottom: 20px;
      text-transform: uppercase;
      line-height: 1.2;
  }
  
  .btn {
      display: inline-block;
      padding: 15px 40px;
      background: #45a049;
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-size: 1.2em;
      transition: all 0.3s;
      border: 2px solid #45a049;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  }

  .btn-entrar{
    margin-top: 10px;
    background-color: rgb(74, 142, 231);
    color: #fff;
    border:none;
  }
  
  .btn:hover {
      transform: scale(1.1);
      background: #45a049;
  }
  
 
  

  </style>