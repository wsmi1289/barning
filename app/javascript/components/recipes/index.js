import Vue from 'vue/dist/vue.esm'
import axios from 'axios';
import { secureApi } from '../../packs/initializers/axios'
import { recipe } from './recipe'


const recipes = Vue.component('recipes', {
  template: require("html-loader!./../../../views/recipes/index.html.slim"),

  data: function () { return { recipes: [] }; },

  components: { recipe },

  created: function () { this.loadRecipes() },

  methods: {
    loadRecipes: function () {
      secureApi.get('v1/recipes')
        .then(this.setRecipes)
        .catch(this.noRecipes)
    },

    setRecipes: function (response) { this.recipes = response.data; },

    noRecipes: function (response) {
      this.$store.commit('setError', 'You have no recipes yet!');
    },

    removeRecipe: function (index) { this.recipes.splice(index, 1); }
  }
})
export { recipes }