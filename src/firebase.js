import firebase from 'firebase'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDzvYHyeRWMnyZzndK8zH00M7IGEZVtvMI",
  authDomain: "secret-santa-vue-js.firebaseapp.com",
  databaseURL: "https://secret-santa-vue-js.firebaseio.com",
  projectId: "secret-santa-vue-js",
  storageBucket: "secret-santa-vue-js.appspot.com",
  messagingSenderId: "1074563660560"
});

const db = firebaseApp.database();
export default db
