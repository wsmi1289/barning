import Vue from 'vue/dist/vue.esm'

const ingredient = Vue.component('ingredients', {
  template: require("html-loader!./../../../views/ingredients/_ingredient.html.slim"),
  props: ['name'],
  mounted: function () {
    console.log(this.name)
  },

  methods: {
  }
})
export { ingredient }