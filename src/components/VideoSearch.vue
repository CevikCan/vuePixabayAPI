<template>
<div>
  <div class="container mt-5 text-center">
    <h1>Search Video</h1>
    <hr>
    <div class="form-group mt-5">
      <input type="text" v-model="searchInput" class="form-control border" placeholder="Search video..." id="inputDefault">
      <button type="button" @click="searchVideo" class="btn btn-outline-primary mt-3">Search</button>
    </div>  
  </div>
  <div class="container-fluid d-flex flex-wrap justify-content-around">
    <div v-for="(data,index) in getVideos" v-bind:key="data.id">
    <router-link tag="a" :to="'video-detail/'+data.id">
    <video width="460" height="250" class="mb-3" @click="openVideo(index)">
      <source :src="data.videoURL" type="video/webm">
    </video>
    </router-link>  
    </div> 
</div>
</div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data(){
    return {
      searchInput : "",
      getVideos : []
    }
  },
  methods : {
      searchVideo(){        
        this.$store.dispatch("getSearchVideo",this.searchInput);
        this.getVideos = this.getSearchVideo;
        this.searchInput = "";
      },
      openVideo(index){
       this.$store.dispatch("getVideo",index)
      }
  },
  computed : {
    ...mapGetters([
      "getSearchVideo"
    ])
  },
  beforeRouteLeave(to,from,next){
      if(this.getVideos.length >= 0 ) {
          this.getVideos.splice(0);
          next();
      }
  }
}
</script>