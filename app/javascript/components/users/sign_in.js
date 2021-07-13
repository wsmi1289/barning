import Vue from 'vue/dist/vue.esm'
import axios from 'axios';
import { plainApi } from '../../packs/initializers/axios'
import { boolean } from '../../helpers/utils'
import { JwtToken } from '../../packs/initializers/jwt_token'


const signIn = Vue.component('sign-in', {
  template: require("html-loader!./../../../views/users/sessions/_sign_in.html.slim"),
  data: function () {
    return { email: 'wsmi1289@gmail.com', password: 'smith', error: null }
  },

  methods: {
    signin: function () {
      this.$store.commit('setLoading', true);
      plainApi.post('v1/users/sessions', { email: this.email, password: this.password })
        .then(this.signinSuccessful)
        .catch(this.signinFailed)
    },

    signinSuccessful: function (response) {
      console.log(response.data)
      localStorage.signedIn = true;
      this.$store.commit('setUser', response.data);
      this.$store.commit('setError', null);
      this.$store.commit('setLoading', false);
      this.$router.push('/recipes');
    },

    signinFailed: function (response) {
      console.log(response)
      this.$store.commit('setUser', null);
      this.$store.commit('setError', response.error);
      this.$store.commit('setLoading', false);
    }
  }
})
export { signIn }