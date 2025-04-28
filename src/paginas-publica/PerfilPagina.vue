<template>
    <div>
      <TheTopo />
  
      <div class="header-content">
        <header class="header">
          <div style="position: absolute; top: 65px; right: 15px;" @click="sair">
            <i class="bi bi-box-arrow-left"></i> Sair
          </div>
          <br /><br />
            <div>
              <div style="position: relative; width: 100px; margin: 0 auto;">
                <div class="profile-image" style="background-color: aliceblue; overflow: hidden;">
                  <img src="/foto2.png" alt="Foto de FERNANDO AUGUSTO" />
                </div>
                <div style="position: absolute; bottom: 10px; right: -10px; display: flex;">
                  <div class="me-2" style="display: flex; justify-content: center; align-items: center; background: #e1e1e1; color: #000; width: 40px; height: 40px; border-radius: 50%;">
                    <!-- <i class="bi bi-pencil-square"></i> -->
                    <i class="bi bi-camera-fill"></i>
                  </div>
                  <!-- <div style="display: flex; justify-content: center; align-items: center; background: #e1e1e1; color: #000; width: 40px; height: 40px; border-radius: 50%;">
                    <i class="bi bi-trash-fill"></i>
                  </div> -->
                </div>
              </div>
              <h1>Perfil</h1>
              <p>(+244) {{ perfil.telefone }}</p>
              <!-- <button class="btn-sair" @click="sair">Sair</button> -->
              <button class="btn btn-success mt-2" data-bs-toggle="modal" data-bs-target="#editarPerfil">
                  Editar Perfil <i class="bi bi-pencil-square ms-2"></i>
              </button>
          </div>
        </header>
  
        <main class="dados">
          <h1>{{ perfil.name }}</h1>
          <p>{{ perfil.email }}</p>
        </main>
      </div>

<!-- Modal -->
<div class="modal fade" id="editarPerfil" aria-hidden="true" aria-labelledby="editarPerfilLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editarPerfilLabel">Editar Perfil</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input type="text" class="form-control" id="nome" name="nome" v-model="perfil.name" required>
          </div>

          <div class="mb-3">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="number" class="form-control" id="telefone" name="telefone" v-model="perfil.telefone" required>
          </div>
        </form> 
      </div>
      <div class="modal-footer justify-content-center">
        <button class="btn btn-success" data-bs-target="#editarPerfil" data-bs-toggle="modal" @click="editarPerfil">Guardar</button>
      </div>
    </div>
  </div>
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
          email: "",
          password: ""
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

      async editarPerfil() {
        if(this.perfil.name == "" || this.perfil.telefone == "") {
          this.$notyf.open({ type: 'error', message: "Preencha todos os campos" })

          return
        }

        const rawUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!rawUser || !token) {
          console.error("Usuário ou token não encontrado no localStorage.");
          return;
        }

        let user;
        try {
          user = JSON.parse(rawUser);
        } catch (e) {
          console.error("Erro ao converter o usuário:", e);
          return;
        }

        const enviarRequisicao = async (url) => {
          try {
            const response = await axios.put(url, this.perfil, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (response) {
              this.conteudoMsg = "";
              this.detalhar();
              
              this.$notyf.open({ type: 'success', message: 'Salvo com sucesso!' })



            }
          } catch (error) {
            console.error("Erro na requisição:", error);
          }
        };

        // Determina a URL com base no perfil do usuário
        const url =
          user.perfil === "cliente"
            ? "https://destino-api.crmcruzeiro.online/api/atualizar_cliente/10"
            : "https://destino-api.crmcruzeiro.online/api/enviar_mensagem";

        await enviarRequisicao(url);
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
    /* overflow: hidden; */
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
  