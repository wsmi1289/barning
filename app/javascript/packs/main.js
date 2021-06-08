import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios';
import { store } from '../store'
import { router } from '../router'

import { secureApi, plainApi } from './initializers/axios'

// import { signIn } from '../components/users/sign_in'
import { boolean } from '../helpers/utils'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


Vue.use(Buefy)
Vue.use(TurbolinksAdapter)


document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: '#main',
    router: router,
    store: store,
    data: function () {
      return {
        api: plainApi,
        secureApi: secureApi,
      }
    },
    created: function () {
      if (!this.$store.state.currentUser && !this.loggingIn) {
        this.$router.push('users/sessions/new')
      }
    },
    computed: {
      loggingIn: function () { return this.$router.currentRoute.path === '/users/sessions/new'; },
    },
    methods: {
      removeFlashMsg: function (e) {
        this.$el.querySelector('.flash-msgs').removeChild(e.target.parentNode);
      }
    },
  });
})