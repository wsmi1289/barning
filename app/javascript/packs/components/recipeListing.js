import Vue from 'vue/dist/vue.esm'

export default Vue.component('recipe-listing', {
  template: require("html-loader!./../../../views/recipes/_recipe_listing.html.slim"),
  props: ['recipe'],
});