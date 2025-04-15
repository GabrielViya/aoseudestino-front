<template>
    <div class="main">

        
        
<div class="container">
        <h2 style="color:darkcyan;">AO SEU DESTINO</h2>
        <br>
        <form @submit.prevent="cadastrar">
            
            <div v-if="!url_perfil">
                <span class="box-user"  @click="perfil('cliente')">
                    Sou Cliente
                </span>
                <span class="box-usertransp" @click="perfil('transportador')">
                    Sou Transportador
                </span>
            </div>
           
            <div v-if="url_perfil">
                <div class="user">
            <p>{{ conta }}</p>
        </div>
        <br>
            <div class="input-group">
                <label for="nome">Nome Completo</label>
                <input type="text" id="nome" name="nome" v-model="data.name" required>
            </div>
            <div class="input-group">
                <label for="nome">Telefone</label>
                <input type="text" id="nome" name="nome" v-model="data.telefone" required>
            </div>
            <div class="input-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" v-model="data.email" required>
            </div>
            <div class="input-group">
                <label for="senha">Senha</label>
                <input type="password" id="senha" name="senha" v-model="data.password" required>
            </div>
            <div class="input-group">
                <label for="confirmar-senha">Confirmar Senha</label>
                <input type="password" id="confirmar-senha" name="confirmar-senha" required>
            </div>
            <button type="submit" @click="cadastrar()">Cadastrar</button>
        </div>
        </form>
        <br>
        <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
    </div>
</div>
</template>

<script>
    import axios from "axios"
    import Swal from 'sweetalert2'

    export default {
        components: {

        },

        data() {
            return {
                produtos: [],
                id: "",
                data: {
                    name: "",
                    telefone: "",
                    email: "",
                    password: ""
                },
                isLoading: false,
                url_perfil:"",
                conta: ""
            }
        },

        methods: {
        async cadastrar() {

            if (this.isLoading) return;
            this.isLoading = true;

            try {
            // Cadastro
            const cadastroResponse = await axios.post(
               this.url_perfil,
                this.data
            );

            if (cadastroResponse.status < 200 || cadastroResponse.status >= 300) {
                throw new Error("Falha no cadastro");
            }

            // Login
            const loginResponse = await axios.post(
                "https://destino-api.crmcruzeiro.online/api/login",
                {
                email: this.data.email,
                password: this.data.password,
                }
            );

            // Redirecionamento
            localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
            localStorage.setItem("token", loginResponse.data.token);
            
            // Verifica se existe pedido_temp
            let data = null
                        let id_pedido = null
                        
                        if(localStorage.getItem("pedido_temp")) {
                            if(localStorage.getItem("token")) {

                                data = JSON.parse(localStorage.getItem("pedido_temp"))
                                this.produtos = JSON.parse(localStorage.getItem("produtos_temp"))

                                localStorage.removeItem("pedido_temp")
                                localStorage.removeItem("produtos_temp")

                                // this.$router.push("/pedidos")
                            }

                            // Buscar o id do cliente
                            const user= JSON.parse(localStorage.getItem("user"))
                            
                            const cliente = await axios("https://destino-api.crmcruzeiro.online/api/listar_cliente?id_usuario="+user.id)

                            this.id = cliente.data.data[0].id

                            data.id_cliente = this.id

                            await axios.post("https://destino-api.crmcruzeiro.online/api/cadastrar_pedido", data).then( (response)=>{
                                console.log(response.data.data)
                                id_pedido=response.data.data.id
                            });

                            // Atualizando todos os produtos com o ID do pedido
                            this.produtos.forEach(produto => {
                                produto.id_pedido = id_pedido;
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

                            this.$router.push('/pedidos')
                        }

            if (loginResponse.data.user.perfil === "entregador") {
                this.$router.push("/pedido-entregador");
            } else {
                this.$router.push("/pedidos");
            }

            } catch (e) {
            Swal.fire({
                title: "Erro!",
                text: e.response?.data?.message || "Erro durante o processo.",
                icon: "error",
                confirmButtonText: "Ok",
            });
            } finally {
            this.isLoading = false;
            }
        },
        perfil(nome_perfil){
            if(nome_perfil == "cliente"){
                this.url_perfil ="https://destino-api.crmcruzeiro.online/api/cadastro_cliente"
                this.conta = "Conta Cliente"
            }
            else{
                this.url_perfil="https://destino-api.crmcruzeiro.online/api/cadastrar_entregador"
                this.conta = "Conta Transportador"
            }
        }
        },

        created() {

        }
    }
</script>

<style scoped>
 /* Reset básico */
 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        .main {
            padding: 0 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
        }

        .container {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
       
        h2 {
            margin-bottom: 20px;
            color: #333;
        }

        .user{
            color:darkcyan;
            text-align: left;
            font-size: 20px;
        }

        .input-group {
            margin-bottom: 15px;
            text-align: left;
        }

        .input-group label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: #333;
        }

        .input-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        .box-user{
            width: 100%;
            padding: 10px;
            background: #1183c5;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            margin-right: 15px;
            
        }
        .box-usertransp{
            width: 100%;
            padding: 10px;
            background: #01c815;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px
        }

        button {
            width: 100%;
            padding: 10px;
            background: #07642b;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        button:hover {
            background: #176903;
        }

        p {
            margin-top: 10px;
        }

        p a {
            color: #056216;
            text-decoration: none;
        }

        p a:hover {
            text-decoration: underline;
        }
</style>