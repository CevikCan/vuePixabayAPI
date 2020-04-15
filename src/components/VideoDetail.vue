<template>
    <div class="container mt-5">
       <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="showAlert">
       You liked the video. The video added like list.
        </div>
      </transition>
    <div class="row">
      <div class="col-9">
        <video width="800" height="350" controls>
            <source :src="getSelectVideo.videoURL" type="video/webm">
        </video>         
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col-4">
            <img :src="getSelectVideo.userImageURL" alt="..." class="rounded-circle w-100">
          </div>
          <div class="col-8">
              <div class="row">
                  <div class="col">
                    <a href=""> {{ getSelectVideo.user }} </a>
                  </div>
              </div>
              <div class="row">
           <div class="col-4">
            <button type="button" class="btn btn-success btn-sm mt-1">Follow</button>
           </div>          
          </div>
        </div>
    </div>
        <hr>
        <div class="row d-flex justify-content-center">
          <button type="button" class="btn btn-info btn-sm mr-2" @click="addVideo">
            <i class="fas fa-thumbs-up"></i> Like
          </button>
          <button type="button" class="btn btn-info btn-sm">
            <i class="fas fa-download"></i> Download
          </button>
        </div>
        <hr>
        <div class="row">
            <div class="col-12 photoDetail d-flex flex-column">               
                <div>Type : {{ getSelectVideo.type }} </div>
                <div>Views : {{ getSelectVideo.views }} </div>
                <div>Likes : {{ getSelectVideo.likes }} </div>
                <div>Downloads : {{ getSelectVideo.downloads }} </div>
            </div>
        </div>
        <hr>        
      </div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <button type="button" class="btn btn-outline-secondary btn-sm mr-2" 
            v-for="tag in getSelectVideo.tags" v-bind:key="tag.id">
                {{ tag }}
            </button>
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import axios from "axios"
export default {
    data(){
        return {
            relatedVideos : [],
            showAlert : false,           
        }
    },
    computed:{
        ...mapGetters([
            "getSelectVideo"
        ])
    },
    methods:{
      addVideo(){
        this.$store.dispatch("addVideoLike",this.getSelectVideo);        
        this.showAlert = true;
        setTimeout(()=>{
          this.showAlert = false 
        },2000)       
      }
    },
     created(){
      axios.get("https://pixabay.com/api/videos?key=15881607-aba23776617284e65b5f3ea9e&q="
      +this.getSelectVideo.tags[0]+"&per_page=4")
      .then(response=>{       
        let data = response.data.hits;
        for(let item in data){
          let relatedVideos = {
                videoURL : data[item].videoURL
            }
            this.relatedVideos.push(relatedVideos)
        }
      })     
    }
}
</script>
<style scoped>
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .3s ease;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity .3s ease;
  opacity: 0;
}
</style>