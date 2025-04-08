<template>

    <div>
      <button @click="adicionarItem" class="btn-novo">+ Novo</button>
     <div>
      <table>
       <tr>
        <td>Id</td>
        <td>Nome</td>
       </tr>
       <tr v-for="item in clientes" :key="item.id" class="contact" @click="detalhar()">
        <td>{{ item.id }}</td>
        <td>
          {{ item.name }}
        </td>
       </tr>
      </table>
     </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        clientes:[]
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
      async listar(){
        const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_cliente")

        this.clientes = response.data

        console.log("resultado "+this.clientes)
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
  