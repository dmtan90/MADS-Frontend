<template>
<b-row class="main-height">
    <b-colxx xxs="12" md=12  class="mx-auto auth-main">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
              <div class="text-box">
                <p class="text t1">Welcome to</p>
                <p class="text t2">MADS!</p>
                <p class="text t3">
                  <ul>
                    <li>Monitor</li>
                    <li><span></span></li>
                    <li>Automate</li>
                    <li><span></span></li>
                    <li>Diagnose</li>
                    <li><span></span></li>
                    <li>Secure</li>
                  </ul>
                </p>
                <p class="text t4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <div class="heading-text">Set Password to MADS!</div>
            <b-form @submit.prevent="formSubmit">
              <div class="input-box">
                <label>First Name</label>
                <input type="text" class="form-control" v-model="firstName">
              </div>
              <div class="input-box">
                <label>Last Name</label>
                <input type="text" class="form-control" v-model="lastName">
              </div>
              <div class="input-box">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="input-box">
                <label>Password Confirmation</label>
                <input type="password" class="form-control" v-model="passwordConfirmation">
              </div>
              <div class="button-box">
                <b-button type="submit">Register</b-button>
              </div>
          </b-form>
          <div class="footer-box">
            <ul>
              <li>© 2020, DataKrew, All Rights Reserved</li>
              <li>Privacy & Terms</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import userService from '@/services/user.service'
import TokenService from '@/services/token.service'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      inviteToken: ''
    }
  },
  methods: {
    formSubmit () {
      let payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      }

      userService.create({ inviteToken: this.inviteToken }, payload)
        .then((response) => {
          TokenService.removeToken()
          TokenService.removeRefreshToken()
          localStorage.removeItem('user_id')
          this.$router.push('/user/login')
        })
    }
  },
  mounted () {
    this.inviteToken = this.$route.params.inviteToken
  }
}
</script>
