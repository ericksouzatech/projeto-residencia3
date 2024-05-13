import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes/router'
import Vuex from 'vuex'
import { auth } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    //eslint-disable-next-line no-unused-vars
    create({ commit }, payload) {
      const { email, password } = payload;
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log("usuário criado!", result);
        })
        .catch((error) => {
          alert(error);
        });
    },
    //eslint-disable-next-line no-unused-vars
    login({ commit }, payload) {
      const { email, password } = payload;
      signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("usuário logado!", result);
        commit("setUser", result.user);
      })
      .catch((error) => {
        alert(error);
      });
    },
  },
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

