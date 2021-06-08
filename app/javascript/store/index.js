import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser: function (state, user) { state.currentUser = user },
    setError: function (state, error) { state.error = error },
    setLoading: function (state, loading) { state.loading = loading }
  },
  actions: {},
  getters: {}
})

