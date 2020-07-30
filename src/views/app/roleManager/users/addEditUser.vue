<template>
  <mads-modal
    ref="madsModal"
    :modalID="'add-edit-user-modal'"
    :modalRef="'createUserModal'"
    :modalSections="modalSections"
    :selectedSectionIndex="selectedSectionIndex"
    :editMode="editMode"
    @select-section="selectSection($event)"
    @next-section="nextSection()"
    @on-cancel="onCancel()"
    @on-save="saveUser()">
    <template v-slot:right-panel>
      <sections ref="sections" :selectedSectionIndex="selectedSectionIndex" :editMode="editMode" :userData="user" :roles="roles"></sections>
    </template>
  </mads-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsModal from './../../shared/madsModal'
import sections from './addEditUserSections'
import invitationService from '@/services/invitation.service'
import UserEventBus from './../eventBus'

export default {
  props: {
    roles: {
      type: Array,
      required: true
    }
  },
  components: {
    madsModal,
    sections
  },
  data () {
    return {
      editMode: false,
      modalSections: [{
        index: 1,
        name: 'Details'
      }, {
        index: 2,
        name: 'Assets'
      }, {
        index: 3,
        name: 'Apps'
      }],
      selectedSectionIndex: 1,
      user: null
    }
  },
  methods: {
    add (user) {
      this.editMode = false
      this.$refs.madsModal.$refs.createUserModal.show()
      this.user = null
    },
    edit (user) {
      this.editMode = true
      this.$refs.madsModal.$refs.createUserModal.show()
      this.user = user
    },
    selectSection (index) {
      this.selectedSectionIndex = index
    },
    nextSection () {
      this.selectedSectionIndex++
    },
    saveUser () {
      let payload = this.$refs.sections.getUserData()

      invitationService.create(payload)
        .then((response) => {
          UserEventBus.$emit('reload-invites')
        })
      this.selectedSectionIndex = 1
    },
    onCancel () {
      this.selectedSectionIndex = 1
      this.allSectionsVisited = false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
</style>
