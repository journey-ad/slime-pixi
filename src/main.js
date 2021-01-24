import Vue from 'vue'
import App from './App.vue'

import 'normalize.css'

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
