import axios from 'axios';
import Vue from 'vue/dist/vue.esm'
import Recipe from '../../models/recipe.js'

export default Vue.component('recipe-form', {
  template: require("html-loader!./../../../views/recipes/_recipe_form.html.slim"),
  props: {
    recipe: {
      type: Object,
      default: function () {
        return {
          id: null,
          recipe_ingredients: []
        }
      }
    }
  },

  data: function () {
    return {
      addingIngredient: false,
      ingredients: [],
    };
  },

  mounted: function () {
    this.getIngredients();
  },

  methods: {
    addIngredient: function (event) {
      console.log(event)
      this.recipe.recipe_ingredients.push({
        amount: null,
        scale: 1,
        ingredient_id: event.id,
        name: event.name
      });
      this.addingIngredient = false;
    },

    filterMethod: function (item) { return item.name },

    getIngredients: function () {
      axios.get('/ingredients.json').then( function (response) {
        this.ingredients = response.data;
      }.bind(this))
    },

  	handleFileUpload: function (e) {
  		console.log('handling file upload: ', e);
  	},

  	handleRecipeSubmit: function (e) {
      // console.log('submitting recipe: ', e);
      // var ingredients = _.pick(this.recipe, 'ingredients');
      // console.log(this.recipe)
      var recipe = new Recipe(this.recipe);
      console.log(recipe)
      recipe.set({recipe_ingredients_attributes: this.recipe.recipe_ingredients})
      console.log(recipe)
      recipe.save().then( function (resp) {
        console.log(resp)
      })
      // recipe.save({
      //   recipe_ingredients_attributes: this.recipe.recipe_ingredients
      // }).then( function (resp) {
      //   console.log(resp)
      // })
      // axios.put('/recipes/' + this.recipe.id + '.json', this.recipe)
  	}
  }
});