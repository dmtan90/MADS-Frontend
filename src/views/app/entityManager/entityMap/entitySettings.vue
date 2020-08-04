<template>
  <div class="settings-container">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab" v-b-toggle.accordion-1>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <div block variant="info" class="header-text">Colors</div>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <div class="color-picker">
              <span>Background</span>
              <div class="input-wrap">
                <span>{{backgroundColor}}</span>
                <input type="color" v-model="backgroundColor">
              </div>
            </div>
            <div class="color-picker">
              <span>Text</span>
              <div class="input-wrap">
                <span>{{textColor}}</span>
                <input type="color" v-model="textColor">
              </div>
            </div>
            <div class="color-picker">
              <span>Outline</span>
              <div class="input-wrap">
                <span>{{borderColor}}</span>
                <input type="color" v-model="borderColor">
              </div>
            </div>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab" v-b-toggle.accordion-2>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <div block variant="info" class="header-text">Font</div>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
            Fonts
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab" v-b-toggle.accordion-3>
        <svg class="icon">
          <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
        </svg>
        <div block variant="info" class="header-text">Notes</div>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
            <textarea name="" class="notes"></textarea>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      backgroundColor: '#fcf5e1',
      textColor: '#262626',
      borderColor: '#595959'
    }
  }
}
</script>

<style lang="scss" scoped>
  .settings-container {
    .card {
      background: transparent;
      box-shadow: none;
      border-bottom: 1px solid #c8cbce;
      padding: 15px 6px;
    }
    .card-header {
      display: flex;
      cursor: pointer;
      display: flex;
      align-items: center;
      .icon {
        width: 15px;
        height: 15px;
        padding-top: 2px;
        fill: #7F7F7F;
      }
      .header-text {
        padding-left: 6px;
        font-size: 16px;
        color: #5A677F;
      }
    }
    .card-body {
      padding: 10px 0 10px 20px;
      .card-text {
        .color-picker {
          height: 60px;
          display: flex;
          align-items: center;
          span {
            width: 90px;
            display: inline-block;
            color: #5A677F;
          }
          .input-wrap {
            border: 1px solid #e2e2e2;
            padding: 5px 5px 5px 10px;
            display: flex;
            align-items: center;
            background-color: white;
            span {
              width: 60px;
            }
            input {
              border: none;
              width: 40px;
              height: 40px;
              cursor: pointer;
            }
          }
        }
        .notes {
          width: 95%;
          // height: 150px;
          // border: 1px solid #e2e2e2;
        }
      }
    }
  }
</style>
