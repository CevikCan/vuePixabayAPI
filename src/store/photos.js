import axios from "axios"
const state = {
    photosTop : [],
    searchPhotos : [],
    selectPhoto : "",
    likePhotosList : []
}
const getters = {
    photosTopList(state){
        return state.photosTop;
    },
    getSelectPhoto(state){
        return state.selectPhoto;
    },
    getSearchPhoto(state){
        return state.searchPhotos;
    },
    getLikePhotos(state){
        return state.likePhotosList;
    }
}
const mutations = {
    updatePhotosTop(state,payload){
        state.photosTop.push(payload);
    },   
    updateSearchPhotos(state,payload) {
        state.searchPhotos.push(payload);
    },
    updateLikePhotoList(state,payload){
        state.likePhotosList.push(payload);
    },
    topSelectPhoto(state,payload) {
        state.selectPhoto = state.photosTop[payload];
    },
    searchSelectPhoto(state,payload){
        state.selectPhoto = state.searchPhotos[payload];
    },
    deletePhotoLikeList(state,payload){
        state.likePhotosList.splice(payload,1);
    }
}
const actions = {
    getPhotosTop({commit}){
        axios.get("https://pixabay.com/api?key=15881607-aba23776617284e65b5f3ea9e&likes").then(response=>{
            let getData = response.data.hits;            
            for(let item in getData){
                let photos = {
                    largeImageURL : getData[item].largeImageURL,
                    id : getData[item].id,
                    user : getData[item].user,
                    userPhoto : getData[item].userImageURL,
                    photoWidth : getData[item].imageWidth,
                    photoHeight : getData[item].imageHeight,
                    views : getData[item].views,
                    downloads : getData[item].downloads,
                    likes : getData[item].likes,
                    type : getData[item].type,
                    tags : getData[item].tags.split(",")                       
                }
                commit("updatePhotosTop",photos)                
            }                   
        }).catch(e=>{
            console.log(e);
        })
    },    
    getPhotoSearch({commit},payload) {
        axios.get("https://pixabay.com/api?key=15881607-aba23776617284e65b5f3ea9e&q="+payload).then(response=>{
          let searchData = response.data.hits;
          for(let item in searchData){
            let photos = {
                largeImageURL : searchData[item].largeImageURL,
                id : searchData[item].id,
                user : searchData[item].user,
                userPhoto : searchData[item].userImageURL,
                photoWidth : searchData[item].imageWidth,
                photoHeight : searchData[item].imageHeight,
                views : searchData[item].views,
                downloads : searchData[item].downloads,
                likes : searchData[item].likes,
                type : searchData[item].type,
                tags : searchData[item].tags.split(",")                       
            }
            commit("updateSearchPhotos",photos)                
        }                   
        }
        )
    },
    getPhotoTopSelect({commit},payload){
        commit("topSelectPhoto",payload)
    },
    getSearchPhotoSelect({commit},payload){
        commit("searchSelectPhoto",payload);
    },
    addPhotoLike({commit},payload){
        commit("updateLikePhotoList",payload);
    },
    deleteLikePhoto({commit},payload){
        commit("deletePhotoLikeList",payload);
    }       
}
export default {
    state,
    getters,
    mutations,
    actions
}