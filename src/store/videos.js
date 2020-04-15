import axios from "axios"
const state = {  
    searchVideo : [],
    selectVideo : "",
    likeVideoList : []
}
const getters = {
    getSearchVideo(state){
        return state.searchVideo
    },
    getSelectVideo(state){
        return state.selectVideo
    },
    getLikeVideos(state){
        return state.likeVideoList
    }
}
const mutations = {   
    updateSearchVideo(state,payload){
        state.searchVideo.push(payload)
    },
    updateSelectVideo(state,payload){
        state.selectVideo = state.searchVideo[payload]
    },
    updateLikeVideoList(state,payload){
        state.likeVideoList.push(payload);
    },
    deleteVideoLikeList(state,payload){
        state.likeVideoList.splice(payload,1);
    }
}
const actions = {   
    getSearchVideo({commit},payload){
        axios.get("https://pixabay.com/api/videos?key=15881607-aba23776617284e65b5f3ea9e&q="+payload)
        .then(response=>{
            let data = response.data.hits;            
            for(let item in data){
                let video = {
                    type : data[item].type,
                    tags : data[item].tags.split(","),
                    views : data[item].views,
                    downloads : data[item].downloads,
                    favorites : data[item].favorites,
                    likes : data[item].likes,
                    user : data[item].user,
                    userImageURL : data[item].userImageURL,
                    videoURL : data[item].videos.large.url,
                    id : data[item].id
                }
                commit("updateSearchVideo",video);
            }
        })
    },
    getVideo({commit},payload){
        commit("updateSelectVideo",payload);
    },
    addVideoLike({commit},payload){
        commit("updateLikeVideoList",payload);
    },
    deleteLikeVideo({commit},payload) {
        commit("deleteVideoLikeList",payload)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}