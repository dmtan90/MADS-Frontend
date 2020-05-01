<template>
  <div class="lock-screen">
    <div class="login-section">
      <div class="user-avatar">
        <span class="initials">{{getUserNameInitials()}}</span>
      </div>
      <div class="user-name">
        {{currentUser.first_name + ' ' + (currentUser.last_name || '')}}
      </div>
      <div class="password-section">
        <b-form-input type="password" v-on:keyup.enter="loginUser()"></b-form-input>
        <span class="forgot-passowrd">Forgot Password</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from './event-bus'

export default {
  methods: {
    getUserNameInitials () {
      let firstNameInitial = (this.currentUser.first_name || '')[0] || ''
      let lastNameInitial = (this.currentUser.last_name || '')[0] || ''
      return firstNameInitial + lastNameInitial
    },
    loginUser () {
      EventBus.$emit('unlock-screen')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
  .lock-screen {
    height: calc(100vh - 60px);
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .login-section {
      color: #FBEAEB;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .user-avatar {
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.5);
        font-size: 45px;
        border-radius: 55px;
      }
      .user-name {
        font-size: 21px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .password-section {
        .forgot-passowrd {
          text-align: right;
          display: block;
          padding-top: 5px;
          cursor: pointer;
        }
      }
    }
  }
</style>
