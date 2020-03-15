<template>
  <div class="fixed-background">
    <div class="taskbar">
      <div class="taskbar-left">
        <div class="taskbar-icons home-button">
          <img src="/assets/img/u14.svg" class="outer-icon" alt="">
          <img src="/assets/img/u15.svg" class="inner-icon"  alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
    
}
</script>

<style lang="scss" scoped>
	.taskbar {
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 1);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
		box-shadow: none;
		opacity: 0.5;
  }
  
  .taskbar-left {
    display: flex;
  }

  .taskbar-icons {
    border-width: 0px;
    // position: absolute;
    // left: 0px;
    // top: 0px;
    width: 60px;
    height: 60px;
    display: flex;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .outer-icon {
      width: 18px;
      height: 18px;
    }
    .inner-icon {
      width: 12px;
      height: 12px;
    }
  }
</style>
