<template>
  <div class="fixed-background">
    <div class="taskbar">
      <div class="taskbar-icons home-icon" @click="openSlider()">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C1-AppStore"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C1-AppStore"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C2-Settings"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C3-Support"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#C4-Voice-Assistant"></use>
        </svg>
      </div>
      <div class="taskbar-icons app-icon">
        <svg class="icon">
          <use xlink:href="/assets/img/icons-sprite.svg#P1-Dashboards"></use>
        </svg>
      </div>
      <div class="taskbar-right">
        <div class="txt-white">SG</div>
        <div class="txt-white">10:30</div>
      </div>
    </div>
    <div class="slider-div" :class="{'small-height-slider': isSmallSlider, 'large-height-slider': isLargeSlider}">
      <div class="slider-content">
        <div class="slider-up-icon" :class="{'d-none': isLargeSlider}" @click="openLargeSlider()">
          <img src="/assets/img/u212.svg" class="inner-icon" alt="">
        </div>
        <div class="hide-slider-content" :class="{'d-none': isSmallSlider}" @click="hideLargeSlider()"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      isSmallSlider: false,
      isLargeSlider: false
    }
  },
  methods: {
    openSlider: function() {
      this.isSmallSlider = !this.isSmallSlider;
      if(this.isLargeSlider) {
        this.isSmallSlider = false;
        this.isLargeSlider = false;
      }
    },
    openLargeSlider: function() {
      this.isSmallSlider = false;      
      this.isLargeSlider = true;
    },
    hideLargeSlider: function() {
      this.isSmallSlider = false;
      this.isLargeSlider = false;
    }
  }  
}
</script>

<style lang="scss" scoped>
	.taskbar {
    display: flex;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
		box-shadow: none;
    align-items: center;
  }

  .taskbar-icons {
    border-width: 0px;
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .taskbar-right {
    position: absolute;
    right: 30px;
    display: flex;
    border-width: 0px;
    width: 100px;
    height: 35px;
    background-color: rgba(255, 255, 255, 0.498039215686275);
    border: none;
    border-radius: 70px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    .txt-white {
      font-family: 'Lato-Bold', 'Lato Bold', 'Lato', sans-serif;
      color: white;
      font-weight: 700;
      font-size: 14px;
      padding: 0 5px;
    }
  }

  .slider-div {
    position: absolute;
    bottom: 60px;
    width: 100%;
    height: 0px;
    background-color: rgba(0, 0, 0, .7);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
		box-shadow: none;
    transition: all .4s ease-out;
    &.small-height-slider {
      height: 301px;
      .slider-content {
        display: flex;
        justify-content: center;
        padding-top: 10px;
      }
    }
    &.large-height-slider {
      height: calc(100% - 60px);
      .slider-content {
        display: flex;
        justify-content: center;
        padding-top: 10px;
      }
    }
    .slider-content {
      display: none;
      .slider-up-icon {
        position: relative;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .inner-icon {
          transform: rotate(90deg);
        }
      }
      .hide-slider-content {
        width: 20px;
        height: 5px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
</style>
