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

    <add-edit-user ref="addEditUser" :roles="roles"></add-edit-user>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import userFields from './userFieldDefs'
import addEditUser from './addEditUser'
import userService from '@/services/user.service'
import { mapGetters } from 'vuex'
import UserEventBus from './../eventBus'

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
    deleteUser (user) {
      let config = { orgId: this.currentUser.org.id, userId: user.id }

      userService.delete(config)
        .then((res) => {
          UserEventBus.$emit('reload-user-list')
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
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
