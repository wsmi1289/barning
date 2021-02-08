import Vue from 'vue/dist/vue.esm'
import axios from 'axios';

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

      axios.put('/recipes/' + this.recipe.id + '.json', this.recipe).then( function (resp) {
        console.log(resp)
      })
  	}
  }
});