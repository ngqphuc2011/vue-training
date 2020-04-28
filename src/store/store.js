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
        addToTexts(state, text) {
            state.texts.push(text);
        },
        addToImages(state, image) {
            state.images.push(image);
        },
        removeAllTextbox(state) {
            state.texts.splice(0, state.texts.length);
        },
        removeAllImage(state) {
            state.images.splice(0, state.images.length);
        }
    },
    actions: {
        getDataFromApi: context => {
            axios({
                method: "GET",
                url: "http://www.mocky.io/v2/5ea2b21931000063061ef332"
            }).then(result => {
                console.log(result.data);
                for (let index = 0; index < result.data.texts.length; index++) {
                    context.commit('addToTexts', result.data.texts[index])
                }
                for (let index = 0; index < result.data.images.length; index++) {
                    context.commit('addToImages', result.data.images[index])
                }
            }, error => {
                console.log(error);
            })
        }
    }
})