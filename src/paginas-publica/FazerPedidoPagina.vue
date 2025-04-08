<template>

    <TheTopo/>
    <div style="padding: 100px 20px;">
     <div class="form-container">
        <h1>📦 Informações para Entrega</h1>
        <form id="orderForm">
            <div class="form-group">
                <label for="numCargas">Número de Cargas:</label>
                <input v-model="cargas" type="number" id="numCargas" min="1" value="1"  required>
            </div>

            <div v-for="(produto, index) in produtos" :key="index">
            <div class="load-section">
                <div class="form-group">
                    <label>Tipo de Carga:</label>
                    <select v-model="produto.produto" required>
                        <option value="">Selecionar</option>
                        <option value="Saco">Saco</option>
                        <option value="Caixa">Caixa</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Peso (kg):</label>
                    <input type="number" v-model="produto.quantidade" required>
                </div>
                <div class="form-group">
                    <label>Localização:</label>
                    <select v-model="produto.localizacao" required>
                        <option value="">Selecione</option>
                        <option value="Fazenda Jamba">Fazenda Jamba</option>
                        <option value="Fazenda Nona">Fazenda Nona</option>
                        <option value="Armazém Central">Armazém Central</option>
                    </select>
                </div>
            </div>
        </div>

            <button type="button" @click="add">Concluir Pedido </button>
        </form>
    </div>
</div>




    <TheBarraMenu/>

</template>
<script>
import TheBarraMenu from '@/components/TheBarraMenu.vue';
import TheTopo from '@/components/TheTopo.vue';
import axios from "axios"


export default{
    components:{
            TheTopo,
            TheBarraMenu
        },


    data() {
        return {
            id:"",
            cargas: "", // Inicia com 1 para mostrar pelo menos um campo
              produtos: Array.from({ length: 0 }, () => ({
                produto: "",
                quantidade: "",
                localizacao: "",
                id_pedido: ""
            }))
        }
    },

    methods:{
        async add() {
            // Antes de registar o pedido, deve verificar se o usuario esta logado
            // Se estiver faça o pedido se já peça login
            
            let id_pedido=null
            const data = {
                "id_cliente": 3, //Substituir pelo this.id
                "status":"em andamento"
            }

            // Atualizando todos os produtos com o ID do pedido
            this.produtos.forEach(produto => {
                produto.id_pedido = id_pedido;
            });

            if(localStorage.getItem("token")) {
                await axios.post("https://destino-api.crmcruzeiro.online/api/cadastrar_pedido", data).then( (response)=>{
                    console.log(response.data.data)
                    id_pedido=response.data.data.id
                });

                try {
                    // Loop para enviar cada produto de forma sucessiva
                    for (const produto of this.produtos) {
                        await axios.post("https://destino-api.crmcruzeiro.online/api/cadastrar_produto", produto);
                        console.log("Produto enviado:", produto);
                    }

                    console.log("Todos os produtos foram enviados com sucesso!");
                } catch (error) {
                    console.error("Erro ao enviar os produtos:", error);
                }
                // for (const produto of this.produtos) {
                // }
                // // Resetar ou redirecionar após o envio
                // this.produtos = Array.from({ length: this.cargas });

                this.$router.push('/pedidos')
                
            } else {
                localStorage.setItem("pedido_temp", JSON.stringify(data))
                localStorage.setItem("produtos_temp", JSON.stringify(this.produtos))

                alert("Precisa fazer login para continuar!")
                this.$router.push("/login")
            } 
        },

        
        concluirpedido(){
        }
    },

    watch: {
        // Observa mudanças na quantidade de cargas e atualiza o array
        cargas(newVal) {
            this.produtos = Array.from({ length: newVal }, () => ({
                produto: "",
                quantidade: "",
                localizacao: "",
                id_pedido: ""
            }));
        }
    },

    async created(){
        if(localStorage.getItem("user")){
            const user= JSON.parse(localStorage.getItem("user"))

            this.id=user.id
            console.log(this.id)

            this.id = await axios("")

        }
    }

    
}

</script>

<style scoped>

* {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }

        body {
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
            background-size: cover;
            background-position: center;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .form-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 800px;
        }

        h1 {
            color: #2c5f2d;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #2c5f2d;
            font-weight: bold;
        }

        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #2c5f2d;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 10px;
        }

        button {
            background-color: #2c5f2d;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            width: 100%;
            transition: background-color 0.3s;
        }

        button:hover {
            background-color: #1e401f;
        }

        .load-section {
            border: 2px solid #2c5f2d;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .form-container {
                padding: 20px;
            }

            h1 {
                font-size: 2em;
            }
        }


</style>