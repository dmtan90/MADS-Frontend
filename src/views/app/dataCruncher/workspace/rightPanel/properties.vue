<template>
  <div class="properties-container">
    <ul class="header">
      <li class="active">Properties</li>
      <li>Settings</li>
    </ul>
    <ul class="properties">
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Information</span>
          </div>
        </div>
        <div class="body">
          <div>
            <span class="text">Flow: </span>
            <span class="value">"f0bc90c8.c9c8f8"</span>
          </div>
          <div>
            <span class="text">Name: </span>
            <span class="value">Flow 1</span>
          </div>
          <div>
            <span class="text">Status: </span>
            <span class="value">Enabled</span>
          </div>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Description</span>
          </div>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Name and Extension</span>
          </div>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Comments</span>
          </div>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Preview</span>
          </div>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            <span>Sharing and Permissions</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .properties-container {
    position: relative;
    height: 100%;
    ul.header {
      list-style: none;
      display: flex;
      height: 40px;
      padding-left: 0;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 0;
      li {
        flex-basis: 50%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          background: #f1f1f1;
          border-right: 1px solid #cccccc;
        }
      }
    }
    .properties {
      list-style: none;
      padding: 0;
      margin: 0;
      height: calc(100% - 70px);
      overflow: auto;
      .property {
        border-bottom: 1px solid #c8cbce;
        padding: 15px;
        .header {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 10px;
          .property-name {
            padding: 0 15px 0 0;
            font-size: 13px;
            text-transform: capitalize;
            font-weight: 700;
            .icon {
              width: 10px;
              height: 10px;
              margin-right: 5px;
            }
          }
          .icon {
            cursor: pointer;
            &.pencil {
              width: 15px;
              height: 15px;
              fill: #4c92c3;
            }
            &.tick {
              width: 24px;
              height: 24px;
              fill: #4c92c3;
            }
          }
        }
        .body {
          .name, .value {
            width: calc(50% - 15px);
            display: inline-block;
            text-transform: capitalize;
            color: #212121;
          }
          .edit-section {
            display: flex;
            align-items: center;
            input {
              width: calc(100% - 39px);
              height: 35px;
            }
            .icon {
              width: 24px;
              height: 24px;
              margin: 0 0 0 auto;
              fill: #4c92c3;
              cursor: pointer;
            }
          }
          .list-section {
            margin: 15px 0;
            .name {
              font-weight: 700;
              font-size: 14px;
            }
          }
        }
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
</style>
