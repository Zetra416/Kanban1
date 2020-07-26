import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false
import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: '633919175163-dsevg4rtbknpe1v5f98ksjb62m37hjc9.apps.googleusercontent.com'
}

Vue.use(GAuth, gauthOption)

new Vue ({
  render:h => h(App),
}).$mount('#app')
