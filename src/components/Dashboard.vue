<template>
    <div v-if="userEmail" class="dashboard-wrap" :data-user='userEmail'>
      <div class="main_wrap">

          <div class="events_list">
            <h1>List of my events</h1>
              <div v-if='getEvents.length == 0' class="no_events">
                Now You don't have any events.<br>
                Create one!
              </div>
              <div class="events_holder">
                <ul>

                    <li v-for="event in getEvents"><router-link :to="{name: 'EventsInfo', params: {id: event['.key']}}" active-class="active"> {{event.name}}</router-link></li>
                  <!-- <li v-for="event in getEvents"><router-link :to="'/events/'+event['.key']"> {{event.name}}</router-link></li> -->
                </ul>
                <div class="submit-msg error">
                  Name is empty. Try again!
                </div>
              <div class="new_event">
                <input type="text" autofocus>
              </div>
                <div @click="createEvent" class="button login_button button_auth" id="create-button"><a>Create Event</a></div>
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
<!-- <div v-else class="main_wrap">
  You have to <router-link to="/login">Login</router-link> or <router-link to="/sign-up">Register</router-link>
</div> -->

    </div>
</template>
<script>
    import * as firebase from 'firebase'
    import db from './../firebase'
    //import userPhoto from '../assets/img/santa-claus.svg'
    const usersRef = db.ref('users')
    const usersRel = db.ref('usersRef')
    const eventsRef = db.ref('events')

    var userEmail = localStorage.user;
    export default {
        name: 'dashboard',
        data: function() {
          return {
            userEmail: localStorage.user,
            user: {
              name: '',
              email: '',
              password: ''
            },
            numbers: [ 1, 2, 3, 4, 5 ],
            items: [
              { email: 'natalia.prokopenko@nure.ua' },
              { email: 'Bar' }
            ]
          }
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

        methods: {
          logOut() {
            firebase.auth().signOut();
            localStorage.removeItem("user");
            this.$router.replace('/');
            $('#box').css({'display': 'block', 'margin-left': 0, 'z-index': 0, 'animation': 'translateAnimationYTop 1s', 'animation-fill-mode': 'both'});
            $('.buttons_holder').css({'display': 'block'});
          },
          createEvent: function() {
            if($('#create-button a').text() == 'Add to List') {
              if($('.new_event input').css('display') != 'none' && $('.new_event input').val() != '') {
                $('#create-button a').html('Create Event');
                $('.new_event').hide();
                let userEmail = this.userEmail;
                var eventsRef = db.ref("events"),
                    nameEvent = $('.new_event input').val();
                eventsRef.push({
                    name: nameEvent,
                    email_admin: userEmail,
                    description: '',
                    place: '',
                    address: '',
                    date: '2018-01-14',
                    time: '00:00',
                    priceFrom: 0,
                    priceTo: 300,
                });
                $('.new_event input').val('');
                if($('.events_holder .submit-msg.error').css('display') != 'none') {
                  $('.events_holder .submit-msg.error').hide();
                }
              } else {
                  $('.events_holder .submit-msg.error').show();
              }
            } else {
                $('#create-button a').html('Add to List');
                $('.new_event').show();
                $('.new_event input').on('keypress', function() {
                $(this).css({'border-width': 2+'px', 'background': 'transparent'});
                });
                if($('.new_event input').val() == '') {
                  $('.new_event input').css({'border-width': 1+'px', 'background': '#ffffff1f'});
                }
            }

          }
        }
    }

</script>
