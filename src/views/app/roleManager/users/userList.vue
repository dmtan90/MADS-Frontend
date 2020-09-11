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
      <template v-slot:apps>
        <span>
          7
        </span>
      </template>
      <template v-slot:actions="props">
        <span @click="editUser(props.rowData)" class="edit-user">Edit</span>
        <span @click="deleteUser(props.rowData)" class="delete-user">Delete</span>
      </template>
    </vuetable>

    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    <add-edit-user ref="addEditUser" :roles="roles"></add-edit-user>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import userFields from './userFieldDefs'
import addEditUser from './addEditUser'
import UserEventBus from './../eventBus'
import madsPagination from '../../shared/madsPagination'

export default {
  props: ['users', 'roles', 'totalRows'],
  components: {
    Vuetable,
    addEditUser,
    madsPagination
  },
  data () {
    return {
      fields: userFields,
      selectedUser: null,
      currentPage: 1,
      perPage: 5
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
    deleteUser (project) {

    },
    onPaginationChange (e) {
      this.currentPage = e
      this.$emit('user-pagination', e)
      UserEventBus.$emit('reload-user-list')
    }
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
  }
</style>

<style lang="scss">
  .users-table {
    td.user-role {
      text-transform: capitalize;
    }
  }
</style>
