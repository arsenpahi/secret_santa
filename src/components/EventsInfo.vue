<template>
    <div v-if="userEmail" class="dashboard-wrap events-component" :data-user='userEmail'>
      <div class="main_wrap">

          <div class="events_list">
            <div class="events_holder">
              <!-- <h1>List of my events</h1> -->
                <vue-tabs :start-index="1" direction="vertical">
                   <v-tab v-for="event_item in getEvents" :title="event_item.name" :key="event_item.name">
                     <div class="event_wrap">
                       <h1> {{event_item.name}}</h1>
                       <p>{{event_item.email_admin}}</p>
                       <div class="options-wrapper">
                         <div class="price-wrapper option-wrapper">
                           <h2 class="option-name">Price Limit</h2>
                          <fieldset class="filter-price">
                            <div class="price-field">
                              <input type="range" :id="'from_'+event_item.name" min="0" max="300" v-model="event_item.priceFrom" v-on:input="onChgFrom($event)">
                              <input type="range" :id="'to_'+event_item.name" min="0" max="300" v-model="event_item.priceTo" v-on:input="onChgTo($event)">
                            </div>
                             <div class="price-wrap">
                              <div class="price-wrap-1">
                                <label :for="'from_'+event_item.name">${{event_item.priceFrom}}</label>
                              </div>
                              <div class="price-wrap_line">-</div>
                              <div class="price-wrap-2">
                                <label :for="'to_'+event_item.name">${{event_item.priceTo}}</label>
                              </div>
                            </div>
                          </fieldset>

                        </div>
                        <div class="desc-wrapper option-wrapper">
                           <h2 class="option-name">Description</h2>
                           <input type="text" name="description" value="">
                        </div>
                        <div class="address-wrapper option-wrapper">
                           <h2 class="option-name">Address</h2>
                           <input type="text" v-model="event_item.address" name="address" value=""><br> {{event_item.address}}
                        </div>
                       </div>

                       <!-- <div v-for="item in anArray">
                         <p>{{ item}}</p>
                       </div><br><br><br><br><br> -->

                         <!-- <li v-for="n in getItem">{{ n }}</li> -->

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
            },
            event_item: {
              name: '',
              email_admin: '',
              address: '',
              priceFrom: 0,
              priceTo: 300,
              sum: 0,
      sum1: 300,
            },


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
           },
           // pushData: function() {
           //   let address = this.address;
           //   console.log(address);
           // }
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
          },
          onChgFrom(e) {
            this.event_item.priceFrom = e.target.value;
            //console.log(e.target);
          },
          onChgTo(e) {
            this.event_item.priceTo = e.target.value;
          },
          onChg (e) {
      this.event_item.sum = e.target.value;
    },
    onChg1 (e) {
      this.event_item.sum1 = e.target.value;
    },
        }
    }


</script>
