<template>
    <div>
      <button @click="adicionarItem" class="btn-novo">+ Novo</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Classe</th>
            <th>Nível</th>
            <th>Semestre</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in planoCarreira" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.classe }}</td>
            <td>{{ item.nivel }}</td>
            <td>{{ item.semestre }}</td>
            <td>
              <button @click="editarItem(item.id)">✏️</button>
              <button @click="removerItem(item.id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios"

  export default {
    data() {
      return {
        planoCarreira: [
          { id: 3, classe: 1, nivel: 'JR', semestre: 1 },
          { id: 4, classe: 2, nivel: 'PL', semestre: 2 }
        ],
        clientes: []
      };
    },
    methods: {
      adicionarItem() {
        console.log("Adicionar novo item");
      },
      editarItem(id) {
        console.log("Editar item", id);
      },
      removerItem(id) {
        this.planoCarreira = this.planoCarreira.filter(item => item.id !== id);
      },
      async listar() {
        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_cliente")

        console.log("resultado "+response)
      }
    },
    created(){
      this.listar()
    }

  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #333;
    color: white;
  }
  .btn-novo {
    margin-bottom: 10px;
    background-color: #007bff;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  button {
    margin-right: 5px;
    cursor: pointer;
  }
  </style>
  