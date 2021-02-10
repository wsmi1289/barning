import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import axios from 'axios';

import Buefy from 'buefy'
import Model from '../models/model.js'
import Recipe from '../models/recipe.js'
import NavBar from './components/navbar.js'
import AutoComplete from './components/autoComplete.js'
import RecipeListing from './components/recipeListing.js'
import RecipeIngredient from './components/recipeIngredient.js'
import RecipeForm from './components/recipeForm.js'

import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  new Vue({
    el: '#main',
    data: function () {
      return { recipes: null }
    },
    mounted: function () {
      this.getRecipes();
    },
    components: {
      'auto-complete': AutoComplete,
      'nav-bar': NavBar,
      'recipe-listing': RecipeListing,
      'recipe-form': RecipeForm,
      'recipe-ingredient': RecipeIngredient,
    },
    methods: {
      flashClass: function (type) {
        var classes = 'notification is-light ';
        switch (type) {
          case 'notice':
          case 'info':
            classes += 'is-info notice';
            break;
          case 'success':
            classes += 'is-success';
            break;
          case 'alert':
          case 'error':
            classes += 'alert is-danger';
            break;
          case 'warning':
            classes += 'is-warning';
            break;
          default:
            classes;
        };
        return classes
      },
      getRecipes: function () {
        axios.get('/recipes.json').then(response => {
          this.recipes = response.data;
          console.log(this.recipes)
        })
      },

      removeFlashMsg: function (e) {
        this.$el.querySelector('.flash-msgs').removeChild(e.target.parentNode);
      }
    }
  });
})