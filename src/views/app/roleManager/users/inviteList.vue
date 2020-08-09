<template>
  <div class="invitations-table">
   <vuetable
        ref="vuetable"
        :api-mode="false"
        :fields="fields"
        :data="invitations"
      >
      <template v-slot:checkbox>
        <b-form-checkbox></b-form-checkbox>
      </template>
      <template v-slot:status="props">
        {{props.rowData.token_valid ? 'Active': 'Expired'}}
      </template>
      <template v-slot:actions="props">
        <span class="delete-invitation" @click="deleteInvitation(props.rowData.id)">Delete</span>
        <span class="reinvite" @click="reInviteUser(props.rowData)">Re-Invite</span>
      </template>
   </vuetable>
    <add-edit-user ref="addEditUser" :roles="roles"></add-edit-user>
    <!-- <invite-user-modal ref="reInviteUserModal" :roles="roles" :reinvite="true" :invitation="selectedInvitation"></invite-user-modal> -->
  </div>
</template>

<script>
import Vuetable from 'vuetable-2'
import { mapGetters } from 'vuex'
import invitationDef from './invitationFieldDefs'
import invitationService from '@/services/invitation.service'
import EventBus from '../eventBus'
import addEditUser from './addEditUser'

export default {
  props: ['invitations', 'roles'],
  components: {
    Vuetable,
    addEditUser
  },
  data () {
    return {
      fields: invitationDef,
      selectedInvitation: null
    }
  },
  methods: {
    deleteInvitation (id) {
      let config = { orgId: this.currentUser.org.id, invitationId: id }

      invitationService.delete(config)
        .then((response) => {
          EventBus.$emit('reload-users')
        })
    },
    reInviteUser (invitation) {
      this.$refs.addEditUser.edit(invitation)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
  .invitations-table {
    margin-top: 30px;
    .delete-invitation, .reinvite {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>

<style lang="scss">
  .invitations-table {
    td.user-role {
      text-transform: capitalize;
    }
  }
</style>
