<template>
<div>
  <app-header></app-header>  
  <router-view></router-view>
 </div> 
</template>
<script>
import Header from "./components/Header"
export default {
  components : {
    appHeader : Header  
  },
  created(){
    this.$store.dispatch("getPhotosTop");   
  }
}
</script>
