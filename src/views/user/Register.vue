<template>
 <b-row class="main-height">
    <b-colxx xxs="12" md=12  class="mx-auto auth-main">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <!-- <p class=" text-white h2">{{ $t('pages.magic-is-in-the-details') }}</p>
              <p class="white mb-0">Please use your credentials to login.<br>If you are not a member, please
                <router-link tag="a" to="/user/register" class="white">register</router-link>.
              </p> -->
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
            <div class="heading-text">Sign Up to MADS!</div>
            <b-form @submit.prevent="formSubmit">
              <div class="input-box">
                <label>Full Name</label>
                <input type="text" class="form-control" v-model="fullname">
              </div>
              <div class="input-box">
                <label>Email Address</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="input-box">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="button-box">
                <b-button type="submit">Sign Up</b-button>
              </div>
              <div class="forgot-text">
                Already member? <router-link tag="a" to="/user/login">Login</router-link>
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
  <!-- <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('pages.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link tag="a" to="/user/login" class="white">login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="fullname">
                <span>{{ $t('user.fullname') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label>
              <div class="d-flex justify-content-end align-items-center">
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('buttons.register')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row> -->
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
