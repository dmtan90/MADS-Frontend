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
            <div class="heading-text">Forgot Password to MADS!</div>
            <b-form @submit.prevent="formSubmit">
              <div class="input-box">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="button-box">
                <b-button type="submit">Reset Password</b-button>
              </div>
              <div class="forgot-text">
                Not a member yet? <router-link tag="a" to="/user/register">Register here</router-link>
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
export default {
  data () {
    return {
      fullname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    formSubmit () {
      this.$router.push('/')
    }
  }
}
</script>
