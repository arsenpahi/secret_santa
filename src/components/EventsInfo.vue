<template>
    <div v-if="userEmail" class="dashboard-wrap events-component" :data-user='userEmail'>
      <div class="main_wrap">

          <div class="events_list">
            <div class="events_holder">
              <!-- <h1>List of my events</h1> -->
                <vue-tabs
           :start-index="1"
           direction="vertical">

                   <v-tab v-for="event in getEvents" :title="event.name" icon="ti-user">

                     <div class="event_wrap">
                       <h1> {{event.name}}</h1>
                       <p>{{event.email_admin}}</p>
                       <div v-for="item in anArray">
                         <p>{{ item}}</p>
                       </div><br><br><br><br><br>
                         <li v-for="n in getItem">{{ n }}</li>
                     <!-- <div v-for="(value, key, index) in anObject">
                       {{ index }}------ {{ key }}  : {{ value }}<br>
                     </div> -->
                     </div>
                   </v-tab>

               </vue-tabs>

                <div class="button login_button button_auth" id="create-button"><router-link to="/dashboard">Create Event</router-link></div>
              </div>

          </div>


        <div class="user-info_wrap ">
          <div class="header">
            <div v-for="user_name in getItem" class="user_name">{{ user_name.name }}</div>
            <div class="user_photo">
              <img src="../assets/img/santa-claus.png" alt="">
            </div>
            <div @click="logOut" class="user_logout">
              <img src="../assets/img/logout.png" alt="">
            </div>
          </div>
          <div class="info">
          </div>
        </div>
      </div>


    </div>
</template>
<script>
    import * as firebase from 'firebase'
    import db from './../firebase'
    import {VueTabs, VTab} from 'vue-nav-tabs'
//you can also import this in your style tag
import 'vue-nav-tabs/themes/vue-tabs.css'
//component code

    const usersRef = db.ref('users')
    const usersRel = db.ref('usersRef')
    const eventsRef = db.ref('events')

    var userEmail = localStorage.user;
    export default {
        name: 'events',
        data: function() {
          return {
            userEmail: localStorage.user,
            user: {
              name: '',
              email: '',
              password: ''
            }
          }
        },
        computed: {
          getItem: function () {
            let userEmail = this.userEmail
            return this.anArray.filter(function (item) {
              if(item.email == userEmail) {
                return item.email
              }
            })
          },
		  getEvents: function() {
             let userEmail = this.userEmail
             return this.eventsArray.filter(function (item) {
               if(item.email_admin == userEmail) {
                 return item.email_admin
               }
             })
           }
        },
        components: {
          VueTabs,
          VTab
        },
        firebase: function () {
            return {
            anArray: usersRef,
            eventsArray: eventsRef,
            anObject: {
                source: usersRef,
                asObject: true,
                cancelCallback: function () {},
                readyCallback: function () {}
              },
            }
        },
        methods: {
          logOut() {
            firebase.auth().signOut();
            localStorage.removeItem("user");
            this.$router.replace('/');
            $('#box').css({'display': 'block', 'margin-left': 0, 'z-index': 0, 'animation': 'translateAnimationYTop 1s', 'animation-fill-mode': 'both'});
            $('.buttons_holder').css({'display': 'block'});
          }
        }
    }

</script>
