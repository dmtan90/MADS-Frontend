<template>
  <div>
    <ul class="properties">
      <li class="property">
        <div class="header">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#collapse-expand"></use>
          </svg>
          <div class="property-name">Name</div>
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
          </svg>
        </div>
        <div class="body"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      properties: {
        name: 'Reliance Corp',
        entity: 'Organization',
        type: '',
        description: 'Indian MNC, with HQ in Mumbai',
        metadata: [
          { name: 'Incorporated', value: '1973' },
          { name: 'Employees', value: '194,056' },
          { name: 'Website', value: 'www.ril.com' }
        ],
        parameters: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .properties {
    list-style: none;
    padding: 20px;
    margin: 0;
    .property {
      .header {
        display: flex;
        width: 100%;
        .icon {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>
