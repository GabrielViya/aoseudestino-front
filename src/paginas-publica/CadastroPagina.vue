<template>
    <div class="main">

    
<div class="container">
        <h2>AO SEU DESTINO</h2>
        <form action="" method="POST">
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
            <button type="button" @click="cadastrar()">Cadastrar</button>
        </form>
        <p>Já tem uma conta? <router-link to="/login">Faça login</router-link></p>
    </div>
</div>
</template>

<script>
    import axios from "axios"

    export default {
        components: {

        },

        data() {
            return {
                data: {
                    name: "",
                    telefone: "",
                    email: "",
                    password: ""
                }
            }
        },

        methods: {
            async cadastrar() {
                await axios.post("https://destino-api.crmcruzeiro.online/api/cadastrar_entregador", this.data)
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