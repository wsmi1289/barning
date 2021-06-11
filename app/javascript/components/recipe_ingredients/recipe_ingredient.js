import Vue from 'vue/dist/vue.esm'
import { secureApi } from '../../packs/initializers/axios'

import { ingredient } from '../ingredients/ingredient'

const recipeIngredient = Vue.component('recipe-ingredient', {
  template: require("html-loader!./../../../views/recipe_ingredients/_recipe_ingredient.html.slim"),

  props: ['recipeIngredient', 'editing'],

  components: { ingredient },

  data: function () {
    return {
      ingredient: this.recipeIngredient.ingredient,
      scales: this.$store.state.scales,
    };
  },

  computed: {
    quantity: function () {
      return this.recipeIngredient.amount + ' ' + this.recipeIngredient.scale;
    }
  },

  methods: {
    destroyRecipeIngredient: function (event) {
      secureApi.delete('v1/recipe_ingredients/' + this.recipeIngredient.id)
        .then(function (response) { this.$emit('rmRecipeIngredient'); }.bind(this))
        .catch(function (response) { console.log(response) })
    }
  }
})
export { recipeIngredient }