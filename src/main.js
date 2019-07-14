import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import BuyModalComponents from '@/components/Common/BuyModal'
import 'vuetify/src/stylus/app.styl'
import firebaseConfig from '../firebase.config'

Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    console.log('firebaseConfig >>>', firebaseConfig)
    
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey, 
      authDomain: firebaseConfig.authDomain, 
      databaseURL: firebaseConfig.databaseURL, 
      projectId: firebaseConfig.projectId, 
      storageBucket: firebaseConfig.storageBucket, 
      messagingSenderId: firebaseConfig.messagingSenderId, 
      appId: firebaseConfig.appId
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
