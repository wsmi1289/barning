import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import { signIn } from '../components/users/sign_in'
import { recipes } from '../components/recipes'


export const router = new VueRouter({
  routes: [
	  { name: 'signIn', path: '/users/sessions/new', component: signIn },
	  { name: 'recipes', path: '/recipes', component: recipes }
	  // { name: 'editRecipe', path: '/recipe/:recipe_id', component: recipes }
	]
})