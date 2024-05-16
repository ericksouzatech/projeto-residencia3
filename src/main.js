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
          alert("Conta criada com sucesso!");
        })
        .catch((error) => {
          alert(error);
        });
    },
    //eslint-disable-next-line no-unused-vars
    login({ commit }, payload) {
        const { email, password } = payload; 
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log("usuário logado!", result);
                commit("setUser", result.user);
                resolve(result);
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                reject(error);
            });
        });
    },
    checkAuthState({ commit }) {
      auth.onAuthStateChanged(user => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('setUser', null);
          console.log("Método de autenticação chamado")
        }
      });
    },
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    authError: state => state.error,
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    store.dispatch('checkAuthState').then(() => {
      if (!store.getters.isAuthenticated) { 
      next('/login');
    } else {
      next();
    }
  });
  } else {
    next();
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

