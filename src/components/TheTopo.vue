<template>
     <header class="fixed-header">
        <div style="position: fixed; top: 24px; left: 20px;">
            <router-link to="/notificacoes">
                <div style="position: relative;">
                    <div style="width: 20px; height: 20px; background: red; border-radius: 50%; position: absolute; top: -10px; left: 5px; display: flex; justify-content: center; align-items: center; color: #fff;">
                        <img src="/logo.jpeg" alt="" width="40" style="border-radius: 8px;">
                    </div>
                </div>
            </router-link>
        </div>  
            
        <h1>AgroEntrega</h1>
        
        <div style="position: fixed; top: 15px; right: 20px;">
            <router-link to="/notificacoes">
                <div style="position: relative;">
                    <i class="bi bi-bell-fill" style="font-size: 18px; color: #fff;"></i>
                    <div style="width: 20px; height: 20px; background: red; border-radius: 50%; position: absolute; top: -10px; left: 5px; display: flex; justify-content: center; align-items: center; color: #fff;">
                        1
                    </div>
                </div>
            </router-link>
        </div>    
        </header>
</template>

<script>

</script>

<style>
    /* Cabeçalho fixo */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #45a049;
    color: #fff;
    padding: 10px 0 !important;
    text-align: center;
    z-index: 1000;
}

.fixed-header h1 {
    margin: 0;
    font-size: 1.5rem;
}

.fixed-header input {
    width: 90%;
    padding: 8px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
}

</style>