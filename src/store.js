import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        url: 'https://api.themoviedb.org/3/movie',
        apiKey: '48dda66521ab26fb827b3aa9dbae2350'
    }
})