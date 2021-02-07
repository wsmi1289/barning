import Vue from 'vue/dist/vue.esm'
import axios from 'axios';

export default Vue.component('recipe-form', {
  template: require("html-loader!./../../../views/recipes/_recipe_form.html.slim"),
  props: ['recipe'],

  data: function () {
    return { ingredients: [], items: [] };
  },

  mounted: function () {
    this.getIngredients();
  },

  methods: {
    getIngredients: function () {
      axios.get('/ingredients.json').then( function (response) {
        this.ingredients = response.data;
        this.items = response.data.map(function (item) {
          return item.name;
        })
      }.bind(this))
    },

  	handleFileUpload: function (e) {
  		console.log('handling file upload: ', e);
  	},

  	handleRecipeSubmit: function (e) {
  		console.log('submitting recipe: ', e);
  	}
  }
});