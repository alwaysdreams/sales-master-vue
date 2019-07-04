import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import router from './router';
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
