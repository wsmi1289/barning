import Vue from 'vue/dist/vue.esm'

const ingredient = Vue.component('ingredients', {
  template: require("html-loader!./../../../views/ingredients/_ingredient.html.slim"),

  props: ['name', 'value', 'editing'],

  data: function () {
    return {
      ingredients: this.$store.state.ingredients
    };
  }
})
export { ingredient }