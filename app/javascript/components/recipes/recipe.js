import Vue from 'vue/dist/vue.esm'
import { secureApi } from '../../packs/initializers/axios'

import { recipeIngredient } from '../recipe_ingredients/recipe_ingredient'


const recipe = Vue.component('recipe', {
  template: require("html-loader!./../../../views/recipes/_recipe.html.slim"),

  props: ['self'],

  components: { 'recipe-ingredient': recipeIngredient },

  data: function () {
    return {
      editing: false,
      recipe: this.self,
      recipeIngredients: this.self.recipe_ingredients
    }
  },

  methods: {
    addRecipeIngredient: function () {
      this.recipeIngredients.push({
        ingredient_id: null,
        amount: null,
        scale: null
      })
    },

    destroyRecipe: function () {
      secureApi.delete('v1/recipes/' + this.recipe.id)
        .then(this.removeSelf)
        .catch(function (response) { console.log(response) })
    },

    saveRecipe: function () {
      var recipePrmse = _.get(this.recipe, 'id') ?
        secureApi.put('v1/recipes/' + this.recipe.id, this.recipeData()) :
        secureApi.post('v1/recipes', this.recipeData())

      recipePrmse.then(this.setRecipe).catch(function (resp) { console.log(resp) })
    },

    setRecipe: function (response) {
      this.recipe = response.data;
      this.recipeIngredients = response.data.recipe_ingredients;
    },

    recipeData: function () {
      this.recipe.recipe_ingredients_attributes = this.recipeIngredients;
      return _.pick(this.recipe, ['id', 'name', 'description', 'directions', 'recipe_ingredients_attributes']);
    },

    rmRecipeIngredient: function (index) { this.recipeIngredients.splice(index, 1); },

    removeSelf: function (response) { this.$emit('removeRecipe'); }
  }
})
export { recipe }