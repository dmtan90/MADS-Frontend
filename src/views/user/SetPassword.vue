<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('pages.magic-is-in-the-details') }}</p>
              <p class="white mb-0">Please set password</p>
          </div>
          <div class="form-side">
            <router-link tag="a" to="/"><span class="logo-single"/></router-link>
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
               <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="firstName">
                <span>First Name</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="text" class="form-control" v-model="lastName">
                <span>Last Name</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="password">
                <span>{{ $t('user.password') }}</span>
              </label>
              <label class="form-group has-float-label mb-4">
                <input type="password" class="form-control" v-model="passwordConfirmation">
                <span>Password Confirmation</span>
              </label>
              <div class="d-flex justify-content-end align-items-center">
                <b-button type="submit" variant="primary" size="lg" class="btn-shadow btn-register">{{ $t('buttons.register')}}</b-button>
              </div>
          </b-form>
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
