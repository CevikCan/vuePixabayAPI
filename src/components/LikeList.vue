<template>
<div>
<div class="container mt-5">  
   <h3>Photos your like</h3>
   <transition name="fade">
      <div class="alert alert-dismissible alert-danger" v-if="showAlertPhoto">
      The photo deleted.
        </div>
      </transition>   
<hr>
<div class="alert alert-light" role="alert" v-if="!this.getLikePhotos.length > 0">
  The list is empty.
</div>
</div>
<div class="container-fluid">          
<div class="row text-center mt-5 mb-5">     
           <div class="col-12 mt-5">
        <div class="card-columns">
          <div class="card" style="width:25rem;"
        v-for="(item,index) in getLikePhotos" v-bind:key="item.id">      
          <a href="#">
            <img :src="item.largeImageURL" class="card-img-top" alt="...">
          </a>
          <div class="deleteBtn" @click="deletePhoto(index)">
            <i class="fas fa-times"></i>
          </div>                  
        </div>
        </div>        
      </div>    
    </div>
    </div>
    <div class="container">
       <h3>Videos your like</h3>
        <transition name="fade">
      <div class="alert alert-dismissible alert-danger" v-if="showAlertVideo">
      The video deleted.
        </div>
      </transition> 
       <hr>
       <div class="alert alert-light" role="alert" v-if="!this.getLikeVideos.length > 0">
  The list is empty.
</div>
    </div>   
    <div class="container-fluid">   
      <div class="row text-center mt-5">
      <div class="col-12 d-flex justify-content-around flex-wrap mt-5">
        <div class="videoContainer mb-3" v-for="(item,index) in getLikeVideos" v-bind:key="item.id">                
            <video width="410" height="250" class="mb-3" controls>
             <source :src="item.videoURL" type="video/webm">
          </video> 
            <div class="deleteVideo" @click="deleteVideo(index)">
            <i class="fas fa-times"></i>
          </div>              
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
      showAlertPhoto : false,
      showAlertVideo : false,     
    }
  },
  computed : {
    ...mapGetters([
      "getLikePhotos",
      "getLikeVideos"
    ])
  },
  methods : {
    deletePhoto(index){
      console.log(this.getLikePhotos.length);
      if(confirm("The photo will delete. Are you sure ?")){
        this.$store.dispatch("deleteLikePhoto",index);
        this.showAlertPhoto = true;
        setTimeout(()=>{
          this.showAlertPhoto = false 
        },2000)
      }     
    },
    deleteVideo(index) {
      if(confirm("The video will delete. Are you sure ?")){
        this.$store.dispatch("deleteLikeVideo",index);
         this.showAlertVideo = true;
         setTimeout(()=>{
          this.showAlertVideo = false 
        },2000)
        console.log("sil")    
      }                   
    }
  }
}
</script>
<style scoped>
.card {
  position:relative;
}
.card:hover {
  cursor: pointer;
}
.card .deleteBtn {
  position: absolute;
  width:30px;
  height:30px;
  padding:5px;
  text-align: center;
  z-index : 3;  
  opacity : 0;
  top:10px;
  right:10px;
  color:white;
  background-color: rgba(0,0,0,0.4);
  transition: all .3s ease;
}
.card:hover .deleteBtn {
  opacity: 1;
}
.card .deleteBtn:hover {
  background-color: rgba(0,0,0,0.7);
}
.videoContainer{
  position: relative;
  z-index: 1;
}
.deleteVideo{
  position: absolute;
  width:30px;
  height:30px;
  padding:5px;
  text-align: center;
  z-index : 3;  
  opacity : 0;
  top:15px;
  right:10px;
  color:white;
  background-color: rgba(0,0,0,0.4);
  transition: all .3s ease;
}
.videoContainer:hover .deleteVideo {
  opacity:1;
  cursor:pointer;
}
.videoContainer .deleteVideo:hover {
  background-color: rgba(0,0,0,0.7);
}
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
