<template>
     <header class="fixed-header">
            <h1>Ao Seu Destino</h1>
            <!-- <div>
            <input type="text" id="trackNumber" placeholder="Digite o número de rastreamento">
            </div> -->
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
    background-color: #28a745;
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