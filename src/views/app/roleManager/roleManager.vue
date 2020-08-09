<template>
  <div class="role-manager app-home">
    <div class="home-card">
      <span>Welcome to</span>
      <h2>Role Manager</h2>
      <p>
        Lorem ipsum dolorsit amet, consecteturadipiscingelit, seddo eiusmodtemporincididuntutlaboreet dolore magna aliqua.
      </p>
      <div class="nav-sections">
        <div class="left-section">
          <span>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            Lorem ipsum dolor sit
          </span>
          <span>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            Lorem ipsum dolor sit
          </span>
        </div>
        <div class="right-section">
          <span>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            Lorem ipsum dolor sit
          </span>
          <span>
            <svg class="icon">
              <use xlink:href="/assets/img/mads-common-icons.svg#arrow-down"></use>
            </svg>
            Lorem ipsum dolor sit
          </span>
        </div>
      </div>
      <div class="learn-more-btn">
        <b-button>Learn More</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .role-manager {
    padding: 30px;
    p {
      margin-top: 20px;
      font-size: 12px;
    }
    &.app-home {
      background: url("/assets/img/role-manager.jpg");
    }
  }
</style>
