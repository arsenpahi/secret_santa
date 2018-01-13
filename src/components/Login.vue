<template>
    <div class="auth_wrap login" id='login'>
        <h1>Login</h1>
        <div class="submit-msg"></div>
        <div  @click="closeForm" class="close_form outer">
          <div class="inner">
            <label>Close</label>
          </div>
        </div>

        <!-- <p>You can <router-link to="/sign-up"> register</router-link></p> -->
				<span class="input">
					<input class="input__field" v-model="user.email" type="text" name="email" id="email_login" />
					<label class="input__label" for="email_login">
						<span class="input__label-content">E-mail *</span>
					</label>
				</span>
				<span class="input">
					<input class="input__field" v-model="user.password" type="password" name="password" id="password_login" />
					<label class="input__label" for="password_login">
						<span class="input__label-content">Password *</span>
					</label>
				</span>
        <button v-on:click="signIn">Sigfn In</button>
    </div>
</template>
<script>
    import firebase from 'firebase'
    import db from './../firebase'
    const usersRef = db.ref('users')
    const usersRel = db.ref('usersRef')
    export default {
        name: 'login',
        data: function() {
          return {
            user: {
              email: '',
              password: ''
            }

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
            // home: function() {
            //   this.$router.replace('main')
            // },
            signIn: function() {
                firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(
                    (user) => {
                      $('.submit-msg').removeClass('error');
                      $('.submit-msg').addClass('success');
                      $('.submit-msg').html('You have been logined!');
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
                    }
                );
            },
            closeForm: function() {
              $('#login').hide();
              $('.buttons_holder').show()
              $('#box').css({'margin-left': 0, 'z-index': 0});
              var href = window.location.href,
               hrefArray = href.split('/'),
               componentName = hrefArray[hrefArray.length-1];
               window.location.href = href.replace(componentName, '');
            }
        }
    }
</script>
<style scoped>
</style>
