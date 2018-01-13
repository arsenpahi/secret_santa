import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import db from './firebase'
import router from './router'


// import firebase from 'firebase'
Vue.config.productionTip = false

require('./assets/css/style.css')
require('./assets/js/parallax.js')
require('./assets/js/script.js')


// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyDzvYHyeRWMnyZzndK8zH00M7IGEZVtvMI",
//   authDomain: "secret-santa-vue-js.firebaseapp.com",
//   databaseURL: "https://secret-santa-vue-js.firebaseio.com",
//   projectId: "secret-santa-vue-js",
//   storageBucket: "secret-santa-vue-js.appspot.com",
//   messagingSenderId: "1074563660560"
// });
//
// const db = firebaseApp.database()
// export default db

// var ref = firebase.database().ref("people");
// console.log(ref);
Vue.use(VueFire)

/* eslint-disable no-new */
//firebase.auth().onAuthStateChanged(function(user){
  //if(!app) {
    var vm = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
      render: h => h(App),

    })
//  }

//});
