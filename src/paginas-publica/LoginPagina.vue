<template>
    <div class="main">

    
<div class="container">
        <h2>AgroEntrega</h2>
        <form action="#" method="POST">

            <div class="input-group">
                <label for="email">Número de Telefone</label>
                <input type="email" id="email" name="email" v-model="user.email" required>
            </div>
            <div class="input-group">
                <label for="senha">Senha</label>
                <input :type="tipo_senha" id="senha" name="senha" v-model="user.password" required>
            </div>

            <div class="mostrar-senha">
                <input type="checkbox" id="mostrar" v-model="showPassword" @change="verSenha">
                <label for="mostrar" @click="verSenha">Mostrar senha</label>
            </div>
            <br>
                
           
            <button type="button" @click="entrar()">Entrar</button>

        </form>
        <br>
        <p>Não tem conta? <router-link to="/cadastro" style="font-size: 20px;">Criar conta</router-link></p>
        <br>
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
                showPassword: false, // Controle da visibilidade da senha
                tipo_senha: "password",
                user: {
                    email: "",
                    password: ""
                }
                }
            },

             methods: {
                verSenha(){
                    // alert(this.showPassword)
                    this.showPassword = !this.showPassword

                    if(this.showPassword){
                        this.tipo_senha = "text"
                    } else {
                        this.tipo_senha = "password"
                    }
                },
                async entrar(){
                
                    // const data={
                    //     "email": "g@gmail.com",
                    //     "password": "12345678"
                    // }

                try{
                    const response = await axios.post("https://destino-api.crmcruzeiro.online/api/login",this.user)

                    if(response) {

                        console.log(response.data.user)
                       
                        if(response.data.user.perfil == "entregador"){
                         
                            this.$router.push("/pedido-entregador")
                        }
                        else{
                         
                            this.$router.push("/pedidos")
                        }

                        const user = JSON.stringify(response.data.user)
                        const token = response.data.token
    
                        localStorage.setItem("user", user)
                        localStorage.setItem("token", token)

                        // Depois de fazer o login verifica se existe algum pedido
                        // guardado, e regista este pedido
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
                    }

                } catch(e) {
                    //msg de erro
                    Swal.fire({
                            title: '¡erro!',
                            text: e.response.data.message,
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })

                }

                }
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
        .mostrar-senha {
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.mostrar-senha label {
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: #666;
}

.mostrar-senha input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
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

        button {
            width: 100%;
            padding: 10px;
            background: #026821;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        }

        button:hover {
            background: #048202;
        }

        p {
            margin-top: 10px;
        }

        p a {
            color: #077614;
            text-decoration: none;
        }

        p a:hover {
            text-decoration: underline;
        }
</style>