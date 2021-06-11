import Vue from 'vue/dist/vue.esm'
import axios from 'axios';
import { secureApi } from '../../packs/initializers/axios'
import { recipe } from './recipe'


const recipes = Vue.component('recipes', {
  template: require("html-loader!./../../../views/recipes/index.html.slim"),

  data: function () { return { recipes: [] }; },

  components: { recipe },

  created: function () {
    this.loadIgredients();
    this.loadRecipes();
    this.loadScales()
  },

  methods: {
    loadIgredients: function () {
      secureApi.get('v1/ingredients').then(this.setIngredients).catch(this.onError)
    },

    loadRecipes: function () {
      secureApi.get('v1/recipes').then(this.setRecipes).catch(this.onError);
    },

    loadScales: function () {
      secureApi.get('v1/scales').then(this.setScales).catch(this.onError);
    },

    onError: function (response) {
      this.$store.commit('setError', 'You have no recipes yet!');
    },

    setIngredients: function (response) { this.$store.commit('setIngredients', response.data) },

    setRecipes: function (response) { this.recipes = response.data; },

    removeRecipe: function (index) { this.recipes.splice(index, 1); },

    setScales: function (response) { this.$store.commit('setScales', response.data) },
  }
})
export { recipes }