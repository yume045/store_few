// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import * as firebase from 'firebase'

var config = {
  databaseURL: 'https://store-2a382.firebaseio.com',
  storageBucket: 'store-2a382.appspot.com'
}
Vue.prototype.$firebase = firebase.initializeApp(config)
let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
  }
})

Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
