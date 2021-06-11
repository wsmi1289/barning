import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    error: null,
    ingredients: [],
    loading: false,
    scales: []
  },
  mutations: {
    setUser: function (state, user) { state.currentUser = user; },
    setError: function (state, error) { state.error = error; },
    setIngredients: function (state, ingredients) { state.ingredients = ingredients; },
    setLoading: function (state, loading) { state.loading = loading; },
    setScales: function (state, scales) { state.scales = scales; },
  },
  actions: {},
  getters: {}
})

