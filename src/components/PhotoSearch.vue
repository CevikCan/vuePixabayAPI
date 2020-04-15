<template>
  <div class="container mt-5 text-center">
    <h1>Search Photo</h1>
    <hr>
    <div class="form-group mt-5">
      <input type="text" v-model="photoInput" class="form-control border" placeholder="Search photo..." id="inputDefault">
      <button type="button" class="btn btn-outline-primary mt-3" @click="photoSearch">Search</button>
    </div>  
     <div class="row text-center mt-5">     
      <div class="container-fluid">
     <div class="card-columns">
      <div class="card" style="width: 25rem;" v-for="(item,index) in getSearchPhoto" v-bind:key="item.id">
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
  data(){
    return {
      photoInput : "",
      getPhotos : []
    }
  },
  computed : {
    ...mapGetters([
      "getSearchPhoto"
    ])
  },
  methods : {
    photoSearch(){
      this.$store.dispatch("getPhotoSearch",this.photoInput)
      this.getPhotos = this.getSearchPhoto
      this.photoInput = ""
      },
      openPhoto(index){
        this.$store.dispatch("getSearchPhotoSelect",index);
      }
  },
  beforeRouteLeave(to,from,next){
      if(this.getPhotos.length >= 0 ) {
          this.getPhotos.splice(0);
          next();
      }
  }
}
</script>