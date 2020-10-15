<template>
  <div class="users-table">
    <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="users"
      >
      <template v-slot:checkbox>
        <b-form-checkbox></b-form-checkbox>
      </template>
      <template v-slot:user="props">
        <div class="managers-box">
          <div class="img-box">
            <img :src="require(`@/assets/img/avatars/${randomSelector(avatars)}.jpg`)" :alt="randomSelector(avatars)" />
          </div>
          <div class="text-box">
            <div class="name">{{props.rowData.user}}</div>
            <div class="email">{{props.rowData.email}}</div>
          </div>
        </div>
      </template>
      <template v-slot:apps>
        <span>
          7
        </span>
      </template>
      <template v-slot:actions="props">
        <div class="action-box">
            <span class="icon-box" @click="editUser(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#edit"></use>
              </svg>
            </span>
            <span class="icon-box" @click="deleteUser(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#trash"></use>
              </svg>
            </span>
            <span class="icon-box" @click="viewUser(props.rowData)">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#view"></use>
              </svg>
            </span>
          </div>
      </template>
    </vuetable>

    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>
    <view-delete-user ref="viewDeleteUser" :isDelete="isDelete"></view-delete-user>
    <add-edit-user ref="addEditUser" :roles="roles"></add-edit-user>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import userFields from './userFieldDefs'
import addEditUser from './addEditUser'
import { mapGetters } from 'vuex'
import EventBus from './../eventBus'
import madsPagination from '../../shared/madsPagination'
import viewDeleteUser from './viewDeleteUser'

export default {
  props: ['users', 'roles', 'totalRows'],
  components: {
    Vuetable,
    addEditUser,
    madsPagination,
    viewDeleteUser
  },
  data () {
    return {
      fields: userFields,
      selectedUser: null,
      currentPage: 1,
      perPage: 5,
      avatars: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ],
      isDelete: false
    }
  },
  methods: {
    renderList (list) {
      return this.$_.join(list, ', ')
    },
    addUser (user) {
      this.$refs.addEditUser.add()
    },
    editUser (user) {
      this.$refs.addEditUser.edit(user)
    },
    deleteUser (user) {
      this.isDelete = true
      this.$refs.viewDeleteUser.delete(user)
    },
    viewUser (user) {
      this.$refs.viewDeleteUser.view(user)
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('user-pagination', e)
      EventBus.$emit('reload-user-list')
    },
    randomSelector (arr) {
      const randomItem = this.$_.sample(arr)
      return randomItem
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  beforeDestroy () {
    EventBus.$off()
  }
}
</script>

<style lang="scss" scoped>
  .users-table {
    margin-top: 30px;
    .edit-user {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
    }
    .delete-user{
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      margin-left: 5px;
    }
    .action-box {
      display: flex;
      .icon-box{
        margin-right: 13px;
        cursor: pointer;
        .icon{
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>

<style lang="scss">
  .users-table {
    td.user-role {
      text-transform: capitalize;
    }
  }
</style>

<style lang="scss">
  .vuetable{
      background: #FFFFFF;
      box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.07);
      border-radius: 8px;
      border:0;
    thead{
      background-color: #F4F4F4;
      border-radius: 5px 5px 0px 0px;
      border-bottom: 0px;
      tr{
        th{
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #363636;
        }
      }
    }
    tbody{
      tr{
        td{
          font-weight: bold;
          font-size: 14px;
          line-height: 17px;
          color: #363636;
          .managers-box{
            display: flex;
            align-items: center;
            .img-box{
              height: 45px;
              width: 45px;
              border-radius: 50%;
              // background-color: #FF9D26;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 6px;
              position: relative;
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
            .text-box{
              .name{
                font-weight: bold;
                font-size: 14px;
                line-height: 17px;
                color: #363636;
              }
              .email{
                font-size: 14px;
                line-height: 17px;
                color: #A7A9AC;
              }
            }
          }
        }
      }
    }
  }
</style>
