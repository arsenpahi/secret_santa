import Vue from 'vue'
import Router from 'vue-router'
//import App from '@/App'
//import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Dashboard from '@/components/Dashboard'
import EventsInfo from '@/components/EventsInfo'

Vue.use(Router)

let router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'App',
    //   component: App
    // },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home
    // },
    {
      path: '/login',
      name: 'Login',
      mode: 'history',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      mode: 'history',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      mode: 'history'
    },
    {
      path: '/events',
      name: 'EventsInfo',
      component: EventsInfo,
      mode: 'history'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let currentUser = firebase.auth().currentUser;
//   let requiresAuth = to.mathched.some(record => record.meta.requiresAuth);
// console.log(currentUser);
//   if(requiresAuth && !currentUser) next('login')
//   else if (!requiresAuth && currentUser) next('dashboard')
//   else next()
// })
export default router
