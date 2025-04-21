<template>
    <div>
      <TheTopo />
  
      <div class="header-content">
        <header class="header">
          <br /><br />
          <div>
            <div class="profile-image">
              <img src="/foto1.jpg" alt="Foto de FERNANDO AUGUSTO" />
            </div>
            <h1>Perfil</h1>
            <p>(+244) {{ perfil.telefone }}</p>
            <button class="btn-sair" @click="sair">Sair</button>
          </div>
        </header>
  
        <main class="dados">
          <h1>{{ perfil.name }}</h1>
          <p>{{ perfil.email }}</p>
        </main>
      </div>
  
      <TheBarraMenu />
    </div>
  </template>
  
  <script>
  import TheBarraMenu from '@/components/TheBarraMenu.vue';
  import TheTopo from '@/components/TheTopo.vue';
  import axios from "axios";
  
  export default {
    components: {
      TheTopo,
      TheBarraMenu
    },
  
    data() {
      return {
        perfil: {
          telefone: "",
          name: "",
          email: ""
        }
      };
    },
  
    methods: {
      async detalhar() {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const id = user.id;
  
          if (user.perfil === "cliente") {
            const response = await axios.get(`https://destino-api.crmcruzeiro.online/api/listar_cliente?id_usuario=${id}`);
            this.perfil = response.data.data.data[0]
          } else {
            const response = await axios.get(`https://destino-api.crmcruzeiro.online/api/listar_entregador?id_usuario=${id}`);
            this.perfil = response.data.data.data[0]
          }
  
          console.log(this.perfil);
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
        }
      },
  
      sair() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    },
  
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
      }
      this.detalhar();
    }
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .dados {
    padding: 10px;
  }
  
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
    margin: 0 auto;
    overflow: hidden;
  }
  
  .profile-image img {
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
  
  .btn-sair {
    margin-top: 10px;
    background-color: #dc3545;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-sair:hover {
    background-color: #c82333;
  }
  </style>
  