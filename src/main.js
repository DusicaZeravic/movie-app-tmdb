import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilm, faSearch, faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFilm, faSearch, faReply)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})