import Vue from 'vue/dist/vue.esm'
// import axios from 'axios';
import { secureApi } from '../../packs/initializers/axios'

import { recipeIngredient } from '../recipe_ingredients/recipe_ingredient'


const recipe = Vue.component('recipe', {
  template: require("html-loader!./../../../views/recipes/_recipe.html.slim"),
  props: ['self'],
  components: {
    "recipe-ingredient": recipeIngredient
  },
  data: function () {
    return {
      editing: false,
      recipe: this.self,
      recipeIngredients: this.self.recipe_ingredients
    }
  },


  methods: {
    addRecipeIngredient: function () {
      console.log(this.recipe)
      this.recipeIngredients.push({
        recipe_id: this.recipe.id,
        ingredient: { name: null },
        amount: null,
        scale: null
      })
    },

    destroyRecipe: function () {
      secureApi.delete('v1/recipes/' + this.recipe.id)
        .then(this.removeSelf)
        .catch(function (response) { console.log(response) })
    },

    rmRecipeIngredient: function (index) { this.recipeIngredients.splice(index, 1); },

    removeSelf: function (response) {
      this.$emit('removeRecipe')
    }
  }
})
export { recipe }