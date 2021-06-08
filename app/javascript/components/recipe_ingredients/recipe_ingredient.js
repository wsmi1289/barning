import Vue from 'vue/dist/vue.esm'
// import { ingredient } from '../ingredients/ingredient'

const recipeIngredient = Vue.component('recipe-ingredient', {
  template: require("html-loader!./../../../views/recipe_ingredients/_recipe_ingredient.html.slim"),
  props: ['recipeIngredient', 'editing'],
  // components: { ingredient },
  data: function () {
    return {
      ingredient: this.recipeIngredient.ingredient,
      scaleOptions: [
        'tsp', 'tbsp', 'C', 'oz', 'g', 'pn', 'gal', 'lb', 'L', 'mL', 'kg', 'pt', 'qt', 'ds'
       ]
    };
  },
  mounted: function () {
    console.log(this.ingredient)
  },
  computed: {
    quantity: function () {
      return this.recipeIngredient.amount + ' ' + this.recipeIngredient.scale
    }
  },

  methods: {
    destroyRecipeIngredient: function (event) {
      this.$emit('rmRecipeIngredient')
    }
  }
})
export { recipeIngredient }