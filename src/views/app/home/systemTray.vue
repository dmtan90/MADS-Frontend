<template>
  <div class="system-tray">
    <div class="user-section">
      <div class="user-avatar">
        <span class="initials">{{userNameInitials}}</span>
      </div>
      <div class="user-info">
        <div class="user-name">{{currentUser.first_name + ' ' + currentUser.last_name || ''}}</div>
        <span class="role">{{currentUser.role && currentUser.role.name}},</span>
        <span class="org">{{currentUser.org && currentUser.org.name}}</span>
      </div>
    </div>
    <div class="tray-options">
      <div class="icon-container">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#dark-mode"></use>
        </svg>
      </div>
      <div class="icon-container">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#logout"></use>
        </svg>
      </div>
      <div class="icon-container">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#notifications"></use>
        </svg>
        <span class="count">2</span>
      </div>
      <div class="icon-container" @click="lockScreen()">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#screen-lock"></use>
        </svg>
      </div>
      <div class="icon-container">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#settings"></use>
        </svg>
      </div>
      <div class="icon-container" v-if="isFullScreen" @click="exitFullScreen()">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#collapse"></use>
        </svg>
      </div>
      <div class="icon-container" v-if="!isFullScreen" @click="goFullScreen()">
        <svg class="icon">
          <use xlink:href="/assets/img/system-tray-icons.svg#expand"></use>
        </svg>
      </div>
      <!-- <svg class="icon">
        <use xlink:href="#expand"></use>
      </svg> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventBus from './event-bus'

export default {
  props: ['userNameInitials', 'isFullScreen'],
  methods: {
    exitFullScreen () {
      EventBus.$emit('exit-full-screen')
    },
    goFullScreen () {
      EventBus.$emit('go-full-screen')
    },
    lockScreen () {
      EventBus.$emit('lock-screen')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  }
}
</script>

<style lang="scss" scoped>
  .system-tray {
    width: 300px;
    height: 300px;
    background: #dadada;
    border-radius: 10px;
    padding: 20px;
    color: black;
    .user-section {
      display: flex;
      align-items: center;
      width: 260px;
      .user-avatar {
        width: 60px;
        height: 60px;
        background: #4c92c3;
        color: white;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .initials {
          font-size: 24px;
        }
      }
      .user-info {
        padding-left: 10px;
        .user-name {
          font-weight: 700;
          font-size: 15px;
        }
        .role, .org {
          text-transform: capitalize;
        }
      }
    }
    .tray-options {
      height: 180px;
      width: 260px;
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      .icon-container {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        flex-basis: 33.3%;
        height: 75px;
        .icon {
          width: 45px;
          height: 45px;
          cursor: pointer;
        }
        .count {
          position: absolute;
          right: 28px;
          top: 16px;
        }
      }
    }
  }
</style>
