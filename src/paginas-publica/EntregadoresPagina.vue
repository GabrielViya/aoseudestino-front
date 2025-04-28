<template>
    <br><br>
    <TheTopo/>

    <div class="contacts-container">
                    <h1>Transportadores</h1>
                    <div class="contact-list" style="overflow: hidden;">

                        <div v-for="item in entregadores" :key="item.id" class="contact" >
                            <div class="profile-pic online">
                                <div class="status-dot"></div>
                                
                            </div>
                            <span class="contact-name">{{ item.name }}</span>
                            <div>
                                <i class="fas fa-car"></i>
                                {{ item.perfil }}
                            </div>
                            <div class="tempo">
                               {{ item.tempo }}
                            </div>
                            <div><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="button-solicitar" @click="getIdEntregador(this, item.id)">Solicitar</button></div>
                        </div>
                        

                   <br><br>

                    <div class="fundo" :class="{'exibir-msg':exibirMsg}" @click="acionarExibirMsg">
                        <!-- <div class="send-button" @click="sendSMS">
                            <span class="send-icon">&gt;</span>
                        </div> -->
                        <div class="contente-msg">
                                <div class="contente-barra-msg">
                                    <div class="barra-msg" @click="acionarExibirMsg"></div>
                                    
                                </div>
                                <div style="padding-top: 15px; text-align: center;">
                                    <i class="bi bi-telephone-outbound-fill"></i> 927860828<br>
                                </div>
                                <div class="ver-msg">
                                    <div class="cliente-msg" v-for="item in this.mensagens" :key="item.id">
                                        <div class="cliente-box-msg">
                                            {{ item.ultima_mensagem.conteudo }}
                                        </div>
                                    </div>
                                    <!-- <div class="entregador-msg">
                                        <div class="entregador-box-msg">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis id temporibus deserunt velit minima atque laudantium amet distinctio iste nemo eveniet veniam perspiciatis et voluptatem ex repudiandae, libero doloribus facere?
                                        </div>
                                    </div> -->
                                </div>
                                <div class="enviar-msg">
                                   <div>
                                    <input type="text" placeholder="conversar" v-model="conteudoMsg">
                                    <i class="bi bi-send-fill" @click="enviarMsg"></i>
                                   </div>
                                </div>
                            </div>
                    </div>
                           
                        </div>

                    </div>
    


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body text-center p-4">
        Solicitar este Entregador?
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-success me-3" @click="fazerSolicitacao" data-bs-dismiss="modal">Sim</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
      </div>
    </div>
  </div>
</div>         
    

    <TheBarraMenu/>
</template>

<script>
import TheBarraMenu from '@/components/TheBarraMenu.vue';
import TheTopo from '@/components/TheTopo.vue';
import axios from "axios"

    export default {
        components:{
            TheTopo,
            TheBarraMenu
        },

        data(){
            return {
               entregadores: [],
               mensagens: [],
               exibirMsg:false,
               conteudoMsg:"",
               id_entregador: "",
               getEvent: ""
            }

        },

        methods: {
            acionarExibirMsg(event) {
                if (event.target === event.currentTarget) { // Só executa se o clique for no .fundo
                    this.exibirMsg = !this.exibirMsg;
                }

            },

            detalhar(){
                this.$router.push("/solicitacao")
            },

            getIdEntregador(event, id) {
                this.id_entregador = id 
                this.getEvent = event
            },      

            async fazerSolicitacao(){
                const id_pedido = this.$route.params.id

                this.acionarExibirMsg(this.getEvent)
                //Verificar 
                if(this.exibirMsg) {
                    const data= {
                        "id_pedido": id_pedido,
                        "id_entregador": this.id_entregador
                    }

                    try {
                        const token = localStorage.getItem("token");

                        const response = await axios.post("https://destino-api.crmcruzeiro.online/api/cadastrar_solicitacao",
                        data,
                        {
                            headers: {
                            Authorization: `Bearer ${token}`
                            }
                        });

                        if(response) {
                            this.$notyf.open({ type: 'error', message: erros })
                        }

                    } catch (error) {
                        
                    }
                }


            },

            async listar (){
            //   buscando os dados na api
              const response = await axios.get("https://destino-api.crmcruzeiro.online/api/listar_entregador")
       
            //   colocando os dados na variavel entregadores
              this.entregadores = response.data.data.data


              console.log(this.entregadores)
            },

            async listarMsg (){
                //   buscando os dados na api
                try {
                    const token = localStorage.getItem("token");

                    const response = await axios.get("https://destino-api.crmcruzeiro.online/api/conversas", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    //   colocando os dados na variavel entregadores
                    this.mensagens = response.data.data
        
                    //   console.log(this.mensagens.ultima_mensagem.conteudo)
                } catch (error) {
                    
                }
            },
            
            async enviarMsg (){
                
                const data={
                    "destinatario_id": 36,
                    "conteudo": this.conteudoMsg
                }

                try {
                    const token = localStorage.getItem("token");

                    const response = await axios.post(
                    "https://destino-api.crmcruzeiro.online/api/enviar_mensagem",
                    data,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`
                        }
                    }
                    );


                    if(response) {
                        this.conteudoMsg=""
                        this.listarMsg()
                    }
                } catch (error) {
                    
                }
        },
            

        },

        created(){
            this.listar()

            this.listarMsg ()
        }
    }
</script>

<style scoped>
.contacts-container {
    
    padding: 15px;
    
}
        .send-button {
            width: 60px;
            height: 60px;
            background-color: #25D366;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        .send-button:hover {
            transform: scale(1.1);
        }

        .send-icon {
            color: white;
            font-size: 24px;
        }

.contact {
    /* display: inline-flex; */
    align-items: center;
    padding: 10px;
    cursor: pointer;
    vertical-align: top;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border-radius: 12px;
    background: #f9f9f9;
}

.profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ddd;
    margin-right: 12px;
    position: relative;
    flex-shrink: 0;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid white;
    position: absolute;
    bottom: 0;
    right: 0;
}

.online .status-dot {
    background: #31a24c;
}

.offline .status-dot {
    background: #ff0000;
}

.contact-name {
    color: #050505;
    font-size: 0.9375rem;
    font-weight: 500;
    white-space: nowrap;
}

.contact-list {
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
}

h1 {
    color: #050505;
    font-size: 1.25rem;
    margin-bottom: 15px;
}

::-webkit-scrollbar {
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

/* Estilo msg */

.fundo{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(300px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;
}
.exibir-msg{
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
}

.contente-msg{
    position: fixed;
    width: 100%;
    height: 600px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: #dfeedd;
    bottom: 0;
}

.contente-barra-msg{
    padding: 5px 0;
    padding-top: 20px;
}

.barra-msg{
    width: 150px;
    height: 3px;
    margin: 0 auto; 
    background-color: #f9f9f9;
}

.ver-msg{
    padding: 10px 15px;
    height: 375px;
    overflow: auto;
}
.enviar-msg{
    padding: 5px;
}
.enviar-msg div {
    border: 1px solid #b1b1b1;
    border-radius: 20px;
}
.enviar-msg input{
    border: none;
    background: none;
    padding: 10px;
    height: 30px;
    width: 80%;
}
.enviar-msg input:focus{
    outline: none;
    border: none;
}
.cliente-msg{
    display: flex;
    justify-content: end;
}
.entregador-msg{
    display: flex;
    justify-content: start;
}
.cliente-box-msg, .entregador-box-msg{
    max-width: 80%;
    margin: 10px 0;
    background-color: #b4b3b3;
    border-radius: 20px;
    padding: 15px;
    font-size: 18px;
    font-family: Arial, sans-serif;

}

.cliente-box-msg{
    background-color: #4be47b;
}
.telefone-msg{
    padding: 10px 0;
    text-align: center;
    padding-bottom: 3px;
}
.button-solicitar {
    background-color: #4CAF50; 
    color: white; 
    border: none;     
    padding: 8px 16px; 
    border-radius: 4px; 
    font-weight: bold; 
    cursor: pointer; 
    margin-right: 20px; 
    transition: background-color 0.3s; 
    width: 100%;
    margin-top: 10px;
}
</style>
