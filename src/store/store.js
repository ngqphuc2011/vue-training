import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        texts: [],
        images: []
    },
    mutations: {
        getDataFromApi(state) {
            axios({
                method: "GET",
                url: "http://www.mocky.io/v2/5ea2b21931000063061ef332"
            }).then(result => {
                console.log(result.data);
                for (let index = 0; index < result.data.texts.length; index++) {
                    state.texts.push(result.data.texts[index]);
                }
                for (let index = 0; index < result.data.images.length; index++) {
                    state.images.push(result.data.images[index]);
                }
            }, error => {
                console.log(error);
            })
        }
    }
})