<template>
  <div>
    <!-- <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search template"></b-form-input>
      </div>
    </div> -->
    <div class="grid templates-grid row">
      <div class="col-md-4 grid-item" v-for="(template, index) in templates" :key="index" @click="selectTheme(template)">
        <div class="header">
          <span class="name">{{template.name}}</span>
        </div>
        <div class="img-wrap" :style="{background: getBackgroundUrl(template.template_image)}">
        </div>
        <div class="info-wrap">
          <div class="info">
            <span class="title">Manager</span>
            <span class="value">{{renderUserName(template.leads)}}</span>
          </div>
          <div class="info">
            <span class="title">Members</span>
            <span class="value">{{renderUserName(template.users)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    templates: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: String,
      default: null
    }
  },
  components: {
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    ...mapActions(['hideAppSidebar']),
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    },
    addTemplate (template) {
      this.$refs.addEditTemplate.add()
    },
    editTemplate (template) {
      this.$refs.addEditTemplate.edit(template)
    },
    deleteTemplate (template) {
      // let config = { orgId: this.currentUser.org.id, templateId: 1, id: template.id }
      // templateService.delete(config)
      //   .then((response) => {
      //     TemplateEventBus.$emit('reload-templates')
      //   })
    },
    getBackgroundUrl (url) {
      return 'url(' + url + ')'
    },
    selectTheme (theme) {
      this.hideAppSidebar('Dashboards')
      this.$emit('select-theme', theme)
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .table-options {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .search-box {
      input {
        border-radius: 20px;
        width: 500px;
      }
    }
    .role-filter {
      margin-left: 20px;
      position: relative;
      width: 120px;
      label {
        position: absolute;
        left: 0;
        top: -20px;
      }
    }
    .add-template {
      margin: 0 0 0 auto;
    }
  }
  .templates-table {
    margin-top: 30px;
    .edit-template, .delete-template {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
  .grid.templates-grid {
    margin-left: 0;
    margin-right: 0;
    margin-top: 40px;
    justify-content: space-between;
    .grid-item {
      display: flex;
      flex-direction: column;
      height: 310px;
      padding: 0;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.14902);
      justify-content: space-between;
      flex: 0 0 30%;
      width: 30%;
      border-radius: 4px;
      .header {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 10px;
        background: #4c92c3;
        color: white;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        .name {
          font-size: 16px;
        }
        .actions {
          height: 24px;
          margin: 0 0 0 auto;
          display: flex;
          .icon {
            width: 24px;
            height: 24px;
            fill: #FFA07A;
            margin-left: 10px;
            cursor: pointer;
            background: white;
            border-radius: 4px;
            padding: 5px;
          }
        }
      }
      .img-wrap {
        height: 180px;
        max-height: 180px;
        background-color: #fff;
        cursor: pointer;
        background-size: cover !important;
      }
      .info-wrap {
        height: 90px;
        padding: 20px;
        .info {
          display: flex;
          font-size: 14px;
          .title {
            width: 60px;
            font-weight: 700;
              &::after {
              content: ':';
            }
          }
          .value {
            padding-left: 15px;
            &.location {
              text-decoration: underline;
              color: #2aa7ff;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
</style>
