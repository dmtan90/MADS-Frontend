<template>
  <div>
    <div class="widget-header">
      <div class="header">
        <div class="content">
          <div class="txt">
            Graphic resource for everyone
          </div>
          <b-form>
            <b-form-group>
              <b-form-input type="text" placeholder="Search your apps, web"/>
            </b-form-group>
          </b-form>
          <div class="btn-group">
            <button class="btn popular-btn">Popular</button>
            <button class="btn recent-btn">Recent</button>
          </div>
        </div>
      </div>
    </div>
    <div class="widget-category">
      <span class="category" :class="{'active': selectedCategory === 'charts'}" @click="setCategory('charts')">Charts</span>
      <span class="category" :class="{'active': selectedCategory === 'stocks'}" @click="setCategory('stocks')">Stocks</span>
      <span class="category" :class="{'active': selectedCategory === 'maps'}" @click="setCategory('maps')">Maps</span>
      <span class="category" :class="{'active': selectedCategory === 'gantt'}" @click="setCategory('gantt')">Gantt</span>
    </div>
    <div class="widgets">
      <div v-if="selectedCategory === 'charts' || selectedCategory === 'stocks'">
        <b-row>
          <b-colxx xxs="4">
            <img src="/assets/img/u2351.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2352.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2353.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2354.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2355.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2356.png" alt="">
          </b-colxx>
        </b-row>
      </div>
      <div v-if="selectedCategory === 'maps' || selectedCategory === 'gantt'">
        <b-row>
          <b-colxx xxs="4">
            <img src="/assets/img/u2358.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2359.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2360.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2361.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2362.png" alt="">
          </b-colxx>
          <b-colxx xxs="4">
            <img src="/assets/img/u2363.png" alt="">
          </b-colxx>
        </b-row>
      </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      selectedCategory: 'charts'
    }
  },
  methods: {
    setCategory(category) {
      this.selectedCategory = category;
    }
  }
}
</script>

<style lang="scss" scoped>
  .widget-header {
    background: url("/assets/img/widget-store-background.png") no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 400px;
    .header {
      color: white;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: relative;
      .content {
        width: 60%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .txt {
        font-size: 36px;
        text-align: center;
      }
      form {
        input {
          width: 100%;
          border-radius: 20px;
          padding-left: 20px;
          padding-right: 20px;
          &::placeholder {
            text-align: center;
            font-size: 15px;
          }
        }
        margin-top: 30px;
        margin-bottom: 30px;
      }
      .btn-group {
        display: flex;
        justify-content: center;
        .btn {
          width: 100px;
          height: 40px;
          border-radius: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 6px;
          margin-right: 6px;
          font-size: 16px;
          color: white;
          line-height: 1;
          &.popular-btn {
            background: rgba(69, 166, 236, 1);
          }
          &.recent-btn {
            background-color: transparent;
            border: 2px solid rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
  .widget-category {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(215, 215, 215, 1);
    .category {
      width: 80px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #797979;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid rgba(59, 124, 168, 1);
      }
    }
  }
  .widgets {
    padding: 40px 60px;
    img {
      width: 100%;
      padding: 0 20px;
      margin-bottom: 40px;
    }
  }
</style>
