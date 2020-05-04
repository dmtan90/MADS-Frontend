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
      <template v-slot:teams="props">
        <span>
          {{renderList(props.rowData.teams)}}
        </span>
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
      </template>
    </vuetable>

    <edit-user-modal :roles="roles" ref="editUser" :user="selectedUser"></edit-user-modal>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import userFields from './userFieldDefs'
import editUserModal from './editUserModal'

export default {
  props: ['users', 'roles'],
  components: {
    Vuetable,
    editUserModal
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
    editUser (user) {
      this.selectedUser = user
      this.$refs.editUser.$refs.editUserModal.show()
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
  }
</style>

<style lang="scss">
  .users-table {
    td.user-role {
      text-transform: capitalize;
    }
  }
</style>
