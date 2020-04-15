import Vue from "vue"
import VueRouter from "vue-router"
import TopLiked from "../components/TopLiked"
import PhotoSearch from "../components/PhotoSearch"
import VideoSearch from "../components/VideoSearch"
import LikeList from "../components/LikeList"
import PhotoDetail from "../components/PhotoDetail"
import VideoDetail from "../components/VideoDetail"

Vue.use(VueRouter);

const routes = [
    {path:"/",component:TopLiked},
    {path:"/photo-search",component:PhotoSearch},
    {path:"/video-search",component:VideoSearch},
    {path:"/like-list",component:LikeList},
    {path:"/photo-detail/:id",component:PhotoDetail},
    {path:"/video-detail/:id",component:VideoDetail}
]

export const router = new VueRouter({
    routes,
    mode:"history"
})