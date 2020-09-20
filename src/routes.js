import Vue from 'vue'
import Router from 'vue-router'
import Movies from './views/Movies.vue'
import MovieDetails from './views/MovieDetails.vue'

Vue.use(Router)

const router = new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Movies
        },
        {
            path: '/movie/:id',
            name: 'moviedetails',
            component: MovieDetails
        }
    ]
})

export default router;