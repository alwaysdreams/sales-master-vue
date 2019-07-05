import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAxqLzaFbu6iXVj-D5ByVfwH-bB3RAULGY",
      authDomain: "sale-mast3r.firebaseapp.com",
      databaseURL: "https://sale-mast3r.firebaseio.com",
      projectId: "sale-mast3r",
      storageBucket: "",
      messagingSenderId: "477549987047",
      appId: "1:477549987047:web:829a8ab239cbc0c1"
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
}).$mount('#app')
