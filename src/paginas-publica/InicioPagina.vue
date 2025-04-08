<template>
    <!-- <TheMenu/> -->
     <div class=" carregar">

        <img src="/loader.gif" alt="">
     </div>
    
</template>

<script>
import TheMenu from '@/components/TheMenu.vue';


    export default {
        components: {
            TheMenu,
        },

        data(){
            return{
                carregar:true,
            }
        },

        created(){
            setTimeout(()=>{

                if(true){
            this.$router.push("/home")
           }
            },2000)


        }
    }
</script>

<style scoped>

 span{
    opacity: 0;
 }
 
.carregar{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;



}

</style>