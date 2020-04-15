import Vue from "vue"
import Vuex from "vuex"
import Photos from "./photos"
import Videos from "./videos"

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules : {
        Photos,
        Videos
    }
})