<template>

<TheTopo/>
<br><br>
    <div class="chat-container">
      <!-- Sidebar de contatos -->
      <div class="sidebar">
        <h2>Conversas</h2>
        <ul>
          <li class="active">
            <img src="https://i.pravatar.cc/40?img=3" />
            João - Cliente
          </li>
          <li class="active">
            <img src="https://i.pravatar.cc/40?img=4" />
            Maria - Transportadora
          </li>
        </ul>
      </div>
    </div>

    <TheBarraMenu/>
  </template>
  
<script>
  import TheBarraMenu from '@/components/TheBarraMenu.vue';
  import TheTopo from '@/components/TheTopo.vue';

  export default {
        components:{
                TheTopo,
                TheBarraMenu, 
                name: 'ChatHistory',
            
        },

        created() {
          
        }
  }
</script>
  
<style scoped>
  .chat-container {
    display: flex;
    height: calc(100vh - 100px); /* ajuste para o topo e menu */
    font-family: 'Segoe UI', sans-serif;
    background-color: #f5f5f5;
  }
  
  /* Sidebar */
  .sidebar {
    background-color: #e8f5e9;
    /* border-right: 1px solid #c8e6c9; */
    padding: 15px;
    box-sizing: border-box;
    overflow-y: auto;
    width: 100%;
  }
  
  .sidebar h2 {
    font-size: 18px;
    color: #388e3c;
    margin-bottom: 15px;
  }

  .ver-msg{
    padding: 10px 15px;
    height: 300px;
    overflow: auto;
}

.cliente-msg{
    display: flex;
    justify-content: end;
}
.enviar-msg{
    padding: 5px;
}
.cliente-box-msg{
    background-color: #4be47b;
}
.exibir-msg{
    opacity: 1;
    transform: translateY(0px);
    pointer-events: auto;
}
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .sidebar li:hover,
  .sidebar li.active {
    background-color: #c8e6c9;
  }
  
  .sidebar li img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  /* Chat */
  .chat-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
  }
  
  .chat-header {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background-color: #a5d6a7;
    border-bottom: 1px solid #81c784;
  }
  
  .chat-header img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .chat-header h3 {
    font-size: 18px;
    color: #2e7d32;
    margin: 0;
  }
  
  /* Mensagens */
  .messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: #f9fbe7;
  }
  
  .message.sent {
    background-color: #c8e6c9;
    align-self: flex-end;
    text-align: right;
  }
  
  .message.received {
    background-color: #f1f8e9;
    align-self: flex-start;
  }
  
  .time {
    display: block;
    font-size: 0.75em;
    margin-top: 5px;
    color: #666;
  }

</style>
  