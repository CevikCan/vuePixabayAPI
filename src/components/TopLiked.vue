<template>
<div>
  <div class="container mt-5 text-center">
    <h1>Top Photos</h1>
    <hr>
    </div>
    <div class="container-fluid">
    <div class="row text-center mt-5">     
      <hr>
     <div class="card-columns">
      <div class="card" style="width: 29rem;" v-for="(item,index) in photosTopList" v-bind:key="item.id">
        <router-link tag="a" :to="'photo-detail/'+item.id">
        <img :src="item.largeImageURL" class="card-img-top" alt="..." @click="openPhoto(index)"> 
        </router-link>
      </div>
        </div>            
    </div>
</div>
</div>
</template>
<script>
  import {mapGetters} from "vuex"
  export default {
    computed: {
      ...mapGetters([
        "photosTopList",        
      ])
    },
    methods : {
      openPhoto(index){
        this.$store.dispatch("getPhotoTopSelect",index);
      }
    }
  }

</script>
<style scoped>
.card img {
  cursor: pointer;
}
</style>
