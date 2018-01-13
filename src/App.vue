<template>

  <div id="app">
    
    <router-view></router-view>
    <div class="parallax_bg" id="box">
      <div class="box_holder">
        <div class="layer" id="l1">
  				<div id="snow"></div>
  			</div>
        <div class="layer" id="l2">
          <div id="town">
  				</div>
  			</div>
        <div class="layer" id="l3">
  				<div id="hills">
  				</div>
  			</div>
        <div class="layer" id="l4">
          <div id="santa">
  				</div>
  			</div>
      </div>
    </div>
    <div class="buttons_holder">
    <div class="wrap">
      <div class="button login_button button_auth" @click="showSignIn"><router-link to="/login">My Account</router-link></div>
      <div class="button register_button button_auth"  @click="showSignUp"><router-link to="/sign-up">New User</router-link></div>
    </div>

    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import db from './../firebase'


export default {
  name: 'app',
  data: function() {
      return {
        msg: 'Hello',
        show: true
      }
    },
    computed: {
          isNight () {
            //return new Date().getHours() < 7
        }
      },
    methods: {
      showSignUp() {
        $('.buttons_holder').hide();
        $('#signup').show();
        $('#box').css({'margin-left': -25+'%', 'z-index': -1});
      },
      showSignIn() {
        $('.buttons_holder').hide();
        $('#login').show();
        $('#box').css({'margin-left': 25+'%', 'z-index': -1});
      }
    }
}

</script>
