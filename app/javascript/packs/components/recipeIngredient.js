import Vue from 'vue/dist/vue.esm'

export default Vue.component('recipe-ingredient', {
  template: require("html-loader!./../../../views/recipes/_recipe_ingredient.html.slim"),
  props: ['recipe'],
});