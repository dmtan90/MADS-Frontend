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
                <p class="text t3">Monitor Automate Diagnose Secure</p>
                <p class="text t4">Please use your credentials to login.<br>If you are not a member, please
                <router-link tag="a" to="/user/register" class="white">register</router-link>.</p>
              </div>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <div class="heading-text">{{ $t('user.login')}}</div>
            <b-form @submit.prevent="formSubmit">
              <div class="input-box">
                <label>{{ $t('user.email') }}</label>
                <input type="email" class="form-control" v-model="email">
              </div>
              <div class="input-box">
                <label>{{ $t('user.password') }}</label>
                <!-- <div class="input">
                  <div class="icon"></div>
                  <input type="password" class="form-control" v-model="password">
                </div> -->
                  <input type="password" class="form-control" v-model="password">
              </div>
              <!-- <label class="form-group">
                <input type="email" class="form-control" v-model="email">
                <span>{{ $t('user.email') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label> -->
              <div class="button-box">
                <b-button type="submit">{{ $t('buttons.login')}}</b-button>
              </div>
              <!-- <div class="d-flex justify-content-between align-items-center">
                  <router-link tag="a" to="/user/forgot-password">{{ $t('user.forgot-password-question')}}</router-link>
                  <b-button type="submit" variant="primary" size="lg" class="btn-shadow btn-login">{{ $t('buttons.login')}}</b-button>
              </div> -->
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['login']),
    formSubmit () {
      if (this.email !== '' && this.password !== '') {
        this.login({ email: this.email, password: this.password })
      }
    }
  }
  // watch: {
  //   loginError (val) {
  //     if (val != null) {
  //       this.$notify('error', 'Login Error', val, { duration: 3000, permanent: false })
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .image-side {
    p.text-white {
      font-size: 25px;
      width: 310px;
    }
  }
</style>
