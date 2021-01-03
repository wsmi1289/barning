import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'
import Buefy from 'buefy'
import NavBar from './components/navbar.vue'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: '#main',
    data: () => {
      return {
        message: "Can you say hello?"
      }
    },
    components: { App, NavBar }
  })
})