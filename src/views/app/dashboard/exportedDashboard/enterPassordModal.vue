<template>
  <b-modal id="enter-password" ref="enterPassword" size="md" hide-footer @hidden="onCancel()">
    <div class="enter-password-modal">
      <b>This is a private dashboard. Please Enter password to access.</b>
      <b-form>
        <b-form-group label="">
          <b-input type="password" v-model="password" placeholder="Password" class="passowrd-input"></b-input>
          <div class="password-error" v-if="passwordError">Please enter correct password</div>
        </b-form-group>
      </b-form>
      <div class="footer">
        <b-button @click="onEnter()" class="save-btn">Enter</b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  props: {
    passwordError: {
      default: false
    }
  },
  data () {
    return {
      password: ''
    }
  },
  methods: {
    open () {
      this.$refs.enterPassword.show()
    },
    onCancel () {
      this.$refs.enterPassword.hide()
    },
    onEnter () {
      this.$emit('on-password-enter', this.password)
      // this.$refs.enterPassword.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .enter-password-modal {
    padding: 20px;
    form {
      margin-top: 30px;
      .password-error {
        color: #ff0033;
        padding: 10px 0;
      }
    }
    .footer {
      text-align: right;
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        min-width: 90px;
      }
    }
  }
</style>
