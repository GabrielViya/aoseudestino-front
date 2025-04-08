<template>
  
    <div>
      <button @click="adicionarItem" class="btn-novo">+ Novo</button>
     <div>
      <table>
       <tr>
        <td>Id</td>
        <td>Nome</td>
       </tr>
       <tr v-for="item in Encomendas" :key="item.id" class="contact">
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
import axios from "axios"

export default {
  data() {
    return {
    
      Encomendas: []
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
      this.Encomendas = this.Encomedas.filter(item => item.id !== id);
    },
    async listar() {
      const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_encomenda")

    this.Encomendas= response.data     

      console.log("resultado "+response)
    }
  },
  created(){
    this.listar()
  }

};

</script>

<style> 

</style>