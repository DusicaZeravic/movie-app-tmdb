import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilm, faSearch, faReply, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilm, faSearch, faReply, faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
