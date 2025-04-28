<template>
    <div class="bg-gradient" style="height: 100vh;">
        <!-- <TheMenu/> -->
        <div class=" carregar">
            <div>
                <div class="img-fluid">
                    <img src="/logo.jpeg" alt="" width="300" style="border-radius: 10px; box-shadow: -3px 5px 8px 0px rgba(0, 0, 0, 0.1);">
                </div>
                <div class="text-center pt-5">
                    <div class="loader-container">
                        <div class="dot-pulse-loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
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
            }, 2000)


        }
    }
</script>

<style scoped>
.bg-gradient{
    background: rgb(140,171,204);
    background: linear-gradient(179deg, rgba(140,171,204,1) 0%, rgba(39,226,244,0.6662980621936274) 57.99999999999999%, rgba(68,76,44,1) 100%) !important;
  }

 span{
    opacity: 0;
 }
 
.carregar{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}


/* Loader */
.loader-container {
  /* mesmo container da opção 1 */
}

.dot-pulse-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 64px;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #247938;
  animation: pulse 1.5s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>