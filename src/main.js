import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {buildStore} from './store.js'

const fb = require('./firebaseConfig.js');
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSeedling, faCat} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
library.add(faSeedling, faCat);
Vue.component('font-awesome-icon', FontAwesomeIcon);

let app

// handle page reloads
fb.auth.onAuthStateChanged(user => {  // eslint-disable-line no-unused-vars
    if (!app) {
        const store = buildStore()

        // handle page reload
        fb.auth.onAuthStateChanged(user => {
            if (user) {
                store.commit('setCurrentUser', user)
                store.dispatch('fetchUserProfile')
            }
        })

        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
