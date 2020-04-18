<template>
    <div class="container mt-5">
      <transition name="fade">
      <div class="alert alert-dismissible alert-success" v-if="showAlert">
       You liked the photo. The photo added like list.
        </div>
      </transition>
    <div class="row">
      <div class="col-lg-9">
        <img :src="getSelectPhoto.largeImageURL" class="w-100">          
      </div>
      <div class="col-lg-3">
        <div class="row userBox">
          <div class="col-4">
            <img :src="getSelectPhoto.userPhoto" alt="..." class="rounded-circle w-100">
          </div>
          <div class="col-8">
              <div class="row">
                  <div class="col">
                    <a href=""> {{ getSelectPhoto.user }} </a>
                  </div>
              </div>
              <div class="row">
           <div class="col-md-4">
            <button type="button" class="btn btn-success btn-sm mt-1">Follow</button>
           </div>          
          </div>
        </div>
    </div>
        <hr>
        <div class="row d-flex justify-content-center">
          <button type="button" class="btn like btn-info btn-sm mr-2" @click="addPhoto">
            <i class="fas fa-thumbs-up"></i> Like
          </button>
          <button type="button" class="btn btn-info btn-sm">
            <i class="fas fa-download"></i> Download
          </button>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-12 photoDetail d-flex flex-column">               
                <div>Type : {{ getSelectPhoto.type }} </div>
                <div>Resolution : {{ getSelectPhoto.photoWidth }} x {{ getSelectPhoto.photoHeight }} </div>
                <div>Views : {{ getSelectPhoto.views }} </div>
                <div>Likes : {{ getSelectPhoto.likes }} </div>
                <div>Downloads : {{ getSelectPhoto.downloads }} </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">Related Photos</div>
            <div class="row mt-3">
                <div class="col d-flex flex-wrap justify-content-center">
                  <div class="relatedPhoto" v-for="item in relatedPhotos" v-bind:key="item.id">
                    <a href="#">
                      <img :src="item.largeImageURL">
                    </a>
                  </div>
                  </div>         
            </div>          
        </div>
      </div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <button type="button" class="btn btn-outline-secondary btn-sm mr-2" 
            v-for="tag in getSelectPhoto.tags" v-bind:key="tag.id">
                {{ tag }}
            </button>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import axios from "axios"
export default {
  data(){
    return {
      relatedPhotos : [],
      showAlert : false
    }
  },
    computed : {
        ...mapGetters([
            "getSelectPhoto"
        ])
    },
    methods : {
      addPhoto(){
        this.$store.dispatch("addPhotoLike",this.getSelectPhoto);
        this.showAlert = true;
        setTimeout(()=>{
          this.showAlert = false 
        },2000)
      }
    },
    created(){
      axios.get("https://pixabay.com/api?key=15881607-aba23776617284e65b5f3ea9e&q="
      +this.getSelectPhoto.tags[0]+"&per_page=4")
      .then(response=>{       
        let data = response.data.hits;
        for(let item in data){
          let relatedPhoto = {
                largeImageURL : data[item].largeImageURL
            }
            this.relatedPhotos.push(relatedPhoto)
        }
      })     
    },  
}
</script>
<style scoped>
.photoDetail {
    background-color:#F6F5FA;
      }
.relatedPhoto {
  width:132px;
  height:80px;
  margin: 0 5px 5px 0;
} 
.relatedPhoto img {
  width:100%;
  height: 80px;
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
@media only screen and (max-width:767px) {
  .userBox img{
    width:100px;
    height: 70px;
  }
   .userBox {
    margin-top:30px;
  }
}
@media only screen and (max-width:991px) {
  .userBox img{
    width:120px;
    height: 90px;
  }
  .userBox {
    margin-top:30px;
  }
}
</style>