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
      <template v-slot:assets="props">
        <span>
          {{renderList(props.rowData.assets)}}
        </span>
      </template>
      <template v-slot:apps="props">
        <span>
          {{renderList(props.rowData.apps)}}
        </span>
      </template>
      <template v-slot:actions="props">
        <span @click="editUser(props.rowData)" class="edit-user">Edit</span>
        <span @click="deleteUser(props.rowData)" class="delete-user">Delete</span>
      </template>
    </vuetable>

    <add-edit-user ref="addEditUser" :roles="roles"></add-edit-user>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import userFields from './userFieldDefs'
import addEditUser from './addEditUser'

export default {
  props: ['users', 'roles'],
  components: {
    Vuetable,
    addEditUser
  },
  data () {
    return {
      fields: userFields,
      selectedUser: null
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
    deleteUser (project){

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
