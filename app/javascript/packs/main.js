import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios';

import App from '../app.vue'
import Buefy from 'buefy'
import NavBar from './components/navbar.vue'
import RecipeListing from './components/recipeListing.vue'

import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: '#main',
    data: function () {
      return { recipes: null }
    },
    mounted: function () {
    	this.getRecipes();
    },
    components: { App, NavBar, RecipeListing },
    methods: {
    	getRecipes: function () {
    		axios.get('/recipes.json').then(response => {
		      this.recipes = response.data;
		    })
    	}
    }
  })
})