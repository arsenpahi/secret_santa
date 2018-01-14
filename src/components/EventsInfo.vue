<template>
    <div v-if="userEmail" class="dashboard-wrap events-component" :data-user='userEmail'>
      <div class="main_wrap">

          <div class="events_list">
            <div class="events_holder" :qty_events="getEvents.length">
              <!-- <h1>List of my events</h1> -->
                <vue-tabs direction="vertical" type="pills" @tab-change="handleTabChange">
                   <v-tab v-for="event_item in getEvents" :title="event_item.name" :key="event_item['.key']" :id="event_item['.key']" >

                     <div class="event_wrap">
                       <h1> {{event_item.name}}</h1>
                       <div class="header_buttons">
                         <div v-on:click="removeEvent(event_item)" class="delete_button icon-wrap">
                           <img src="../assets/img/delete.png" alt="">
                         </div>
                           <div class="button login_button button_auth" id="create-button"><router-link to="/dashboard">Create Event</router-link></div>
                       </div>

                       <p>{{event_item.email_admin}}</p>

                       <div class="options-wrapper">
                         <div class="price-wrapper option-wrapper">
                           <h2 class="option-name">Price Limit</h2>
                           <p>Set limit of gift's price:</p>
                          <fieldset class="filter-price">
                            <div class="price-field">
                              <input type="range" :id="'from_'+event_item.name" min="0" max="300" v-model="event_item.priceFrom" v-on:input="onChgFrom($event, event_item)">
                              <input type="range" :id="'to_'+event_item.name" min="0" max="300" v-model="event_item.priceTo" v-on:input="onChgTo($event, event_item)">
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
                           <textarea v-on:change="editDescription(event_item)" v-model="event_item.description" name="description" rows="3" cols="15" placeholder="Add some description..."></textarea>
                        </div>
                        <div class="address-wrapper option-wrapper">
                           <h2 class="option-name">Address</h2>
                            <input v-on:change="editPlace(event_item)" type="text" v-model="event_item.place" name="place" value="" placeholder="Place"><br>
                           <textarea v-on:change="editAddress(event_item)" v-model="event_item.address" name="address" rows="3" cols="15" placeholder="Address"></textarea>

                        </div>
                        <div class="date-wrapper option-wrapper">
                          <h2 class="option-name">Date and Time</h2>
                          <div class="holder">
                            <datepicker v-on:change="editDate(event_item)" v-model="event_item.date" ></datepicker>
                            <input v-on:change="editTime(event_item)" class="choose_time" type="time" v-model="event_item.time">
                          </div>

                        </div>
<!-- <datetime v-model="time" type="time"></datetime> -->
                       </div>


                     <!-- <div v-for="(value, key, index) in anObject">
                       {{ index }}------ {{ key }}  : {{ value }}<br>
                     </div> -->
                     </div>
                   </v-tab>

               </vue-tabs>


              </div>

          </div>


        <div class="user-info_wrap ">
          <div class="header">
            <div v-for="user_name in getItem" class="user_name">{{ user_name.name }}</div>
            <div class="user_photo icon-wrap">
              <img src="../assets/img/santa-claus.png" alt="">
            </div>
            <div @click="logOut" class="user_logout icon-wrap">
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
    import moment from 'moment';
    import datepicker  from 'vue-date';
    import 'vue-nav-tabs/themes/vue-tabs.css'


    const usersRef = db.ref('users')
    const usersRel = db.ref('usersRef')
    const eventsRef = db.ref('events')

    var userEmail = localStorage.user;
    export default {
        name: 'events',
        data: function() {
          return {
            userEmail: localStorage.user,
            activeTab: null,
            user: {
              name: '',
              email: '',
              password: ''
            },
            event_item: {
              name: '',
              email_admin: '',
              description: '',
              place: '',
              address: '',
              date: '2018-01-14',
              time: '00:00',
              priceFrom: 0,
              priceTo: 300,
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
                 // eventsRef.push({
                 //   name: item.name,
                 //   email_admin: item.email_admin
                 // })
                 // console.log(item.name);
                 return item.email_admin
               }
             })
           }
        },
        components: {
          VueTabs,
          VTab,
          datepicker
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
        //   activateTab: function(tab) {
        //     this.activeTab = tab;
        //     console.log(this.activeTab);
        // },
        handleTabChange(tabIndex, newTab){
          //console.log(tabIndex, newTab.id);
          this.$router.replace(newTab.id);
        },

          removeEvent: function (item) {
           eventsRef.child(item['.key']).remove();
           if($('.events_holder').attr('qty_events') <= 1) {
             this.$router.replace('dashboard');
           }
         },
         editEvent: function (item) {
          eventsRef.child(item['.key']).set({
            name: item.name,
            email_admin: item.email_admin,
            description: item.description,
            place: item.place,
            address: item.address,
            date: item.date,
            time: item.time,
            priceFrom: item.priceFrom,
            priceTo: item.priceTo,
          });
        },
          onChgFrom(e, item) {
            item.priceFrom = e.target.value;
            this.editEvent(item);

          },
          onChgTo(e, item) {
            item.priceTo = e.target.value;
            this.editEvent(item);
          },
          editDescription(item) {
            this.editEvent(item);
          },
          editPlace(item) {
            this.editEvent(item);
          },
          editAddress(item) {
            this.editEvent(item);
          },
          editDate(item) {
            console.log($(this).find('.input').html());
            this.editEvent(item);
          },
          editTime(item) {
            this.editEvent(item);
          }
        }
    }


</script>
