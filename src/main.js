import Vue from 'vue'
// import App from './App.vue'

import widget from './components/Widget.vue'
import search from './components/Search.vue'

Vue.config.productionTip = false


const appproperty = new Vue({
  el: '#appproperty',
  components: {
    widget
  },
  data: {}
})

const searchproperty = new Vue({
  el: '#search',
  components: {
    search
  },
  data: {}
})

/*
new Vue({
  render: h => h(App),
}).$mount('#app')
*/