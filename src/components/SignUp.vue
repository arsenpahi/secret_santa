<template>
    <div class="auth_wrap signup" id="signup">
      <!-- <div v-if="user">
  Logged in
  <pre>{{user}}</pre>
</div>
<div v-else>Not logged in</div> -->
        <h1>Register</h1>
        <div class="submit-msg"></div>
        <div  @click="closeForm" class="close_form outer">
          <div class="inner">
            <label>Close</label>
          </div>
        </div>
        <span class="input">
					<input class="input__field" v-model="user.name" type="text" id="name_register" required/>
					<label class="input__label" for="name_register">
						<span class="input__label-content">Name *</span>
					</label>
				</span>
				<span class="input">
					<input class="input__field" v-model="user.email" type="text" name="email" id="email_register" required/>
					<label class="input__label" for="email_register">
						<span class="input__label-content">E-mail *</span>
					</label>
				</span>
				<span class="input">
					<input class="input__field" v-model="user.password" type="password" name="password" id="password_register" required/>
					<label class="input__label" for="password_register">
						<span class="input__label-content">Password *</span>
					</label>
				</span>
        <button v-on:click="signUp" >Sign Up</button>
        <ul>
          {{anArray}}
    <li v-for="item in anArray">

      <p>{{ item.name }}</p>
      <p>{{ item.surname }}</p>
    </li>
  </ul>
        <!-- <p>back to <router-link to="/login">login</router-link></p> -->
    </div>
</template>
<script>
    import * as firebase from 'firebase'
    import db from './../firebase'
    const usersRef = db.ref('users')
    const usersRel = db.ref('usersRef')
    export default {
        name: 'sign-up',
        data: function() {
          return {
            user: {
              name: '',
              email: '',
              password: ''
            },

            show: true,
            anArray: {}
          }
        },

        firebase: function () {
            return {
            anArray: usersRef,
            anObject: {
                source: usersRef,
                asObject: true,
                cancelCallback: function () {},
                readyCallback: function () {}
              }
            }
        },
        methods: {
            signUp: function() {

                firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then(
                    (user) => {
                      $('.submit-msg').removeClass('error');
                      $('.submit-msg').addClass('success');
                      $('.submit-msg').html('Your account has been created. Welcome, '+this.user.name+'!');
                      // usersRef.push({
                      //     name: this.name,
                      //     email: this.email,
                      //     password: this.password
                      //   });
                      usersRef.push(this.user);
                      if (typeof(window.localStorage) !== "undefined") {
                          localStorage.setItem("user", this.user.email);
                      }
                      this.$router.replace('dashboard');
                      $('#box').hide();
                    },
                    function (err) {
                      $('.submit-msg').removeClass('success');
                      $('.submit-msg').addClass('error');
                      $('.submit-msg').html(err.message);
                    },
                );
                if(firebase.auth().currentUser) {

                }
            },
            closeForm: function() {
              $('#signup').hide();
              $('.buttons_holder').show()
              $('#box').css({'margin-left': 0, 'z-index': 0});
              var href = window.location.href,
               hrefArray = href.split('/'),
               componentName = hrefArray[hrefArray.length-1];
               window.location.href = href.replace(componentName, '');
            }
        }
    }
    // $(window).on('load', function(){
    //   $('.close_form').on('click', function(){
    //     console.log('ffffff');
    //     $(this).parent().hide();
    //     $('#box').css({'margin-left': +500+'px', 'z-index': 0})
    //   });
    // });
</script>

<style scoped>
</style>
