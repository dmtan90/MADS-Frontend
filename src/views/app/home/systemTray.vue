<template>
  <div class="system-tray-background">
    <div class="system-tray">
      <div class="user-section">
        <div class="user-avatar">
          <span class="initials">{{userNameInitials}}</span>
        </div>
        <div class="user-info">
          <div class="user-name">{{currentUser.first_name + ' ' + currentUser.last_name || ''}}</div>
          <span class="role">{{currentUser.role && currentUser.role.name}},</span>
          <span class="org">{{currentUser.org && currentUser.org.name}}</span>
          <div class="datetime-zone">{{currentTime | dateFormat}} {{currentTimeZone}}</div>
        </div>
        <div class="hide-tray">
          <div class="arrow-down">
          </div>
        </div>
      </div>
      <div class="tray-options">
        <div class="icon-container">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#settings"></use>
          </svg>
          <span>Settings</span>
        </div>
        <div class="icon-container" v-if="isFullScreen" @click="exitFullScreen()">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#collapse"></use>
          </svg>
          <span>Fullscreen</span>
        </div>
        <div class="icon-container" v-if="!isFullScreen" @click="goFullScreen()">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#expand"></use>
          </svg>
          <span>Fullscreen</span>
        </div>
        <div class="icon-container">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#notifications"></use>
          </svg>
          <span class="count">Notifications</span>
        </div>
        <div class="icon-container">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#dark-mode"></use>
          </svg>
          <span>Dark Mode</span>
        </div>
        <div class="icon-container" @click="lockScreen()">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#screen-lock"></use>
          </svg>
          <span>Lock Screen</span>
        </div>
        <div class="icon-container" @click="logout()">
          <svg class="icon">
            <use xlink:href="/assets/img/system-tray-icons.svg#logout"></use>
          </svg>
          <span>Log Out</span>
        </div>
        <!-- <svg class="icon">
          <use xlink:href="#expand"></use>
        </svg> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EventBus from './event-bus'

export default {
  props: ['userNameInitials', 'isFullScreen', 'currentTime', 'currentTimeZone'],
  methods: {
    ...mapActions(['logout']),
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
  filters: {
    dateFormat (currentTime) {
      return currentTime.format('ddd, DD MMM | H:mm')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'openedApps', 'visualSettings', 'dataSettings', 'userSettingsId'])
  }
}
</script>

<style lang="scss" scoped>
  .system-tray-background {
    border-radius: 10px;
    color: black;
    .user-section {
      display: flex;
      align-items: center;
      color: white;
      padding: 20px;
      border-bottom: 1px solid #fff;
      height: 110px;
      position: relative;
      .user-avatar {
        width: 66px;
        height: 66px;
        background: #1d1e22;
        border-radius: 33px;
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
      .hide-tray {
        position: absolute;
        height: 60px;
        width: 40px;
        top: 0;
        right: 20px;
        background: #1d1e22;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        display: flex;
        justify-content: center;
        .arrow-down {
          position: absolute;
          bottom: 15px;
          border: solid white;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 6px;
          transform: rotate(45deg);
          cursor: pointer;
        }
      }
    }
    .tray-options {
      height: 200px;
      position: absolute;
      bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 10px;
      .icon-container {
        display: flex;
        flex-direction: column;
        position: relative;
        align-items: center;
        justify-content: center;
        flex-basis: 33.3%;
        height: 75px;
        .icon {
          width: 35px;
          height: 35px;
          cursor: pointer;
          fill: white;
        }
        span {
          padding-top: 6px;
          color: white;
        }
      }
    }
    .system-tray {
      width: 310px;
      height: 320px;
      border-radius: 10px;
      background-color: rgba(57, 63, 77, 0.9);
    }
  }
</style>
