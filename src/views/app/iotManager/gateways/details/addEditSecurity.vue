<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'add-edit-static-modal'"
    :modalRef="'createEditSecurityModal'"
    :editMode="editMode"
    @on-cancel="onCancel()"
    @on-save="saveGateway()">
    <template v-slot:body-panel>
        <div class="heading">
            Security
        </div>
        <b-form class="main-panel">
            <b-form-group label="Access Token" label-for="access-token">
              <b-form-input v-model="security.access_token" type="text" id="access-token"></b-form-input>
            </b-form-group>
            <b-button @click="genAccessToken()">Genrate Access Token</b-button>
        </b-form>
    </template>
  </mads-single-section-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import madsSingleSectionModal from '../../../shared/madsSingleSectionModal'
import GatewayEventBus from '../gatewayEventBus'
import gatewayService from '@/services/gateway.service'

export default {
  props: {
    entityMapParentNode: {
      default: null
    }
  },
  components: {
    madsSingleSectionModal
  },
  data () {
    return {
      editMode: false,
      security: {},
      staicParam: {}
      // access_token: null
    }
  },
  methods: {
    add () {
      this.editMode = false
      this.$refs.madsSingleSectionModal.$refs.createEditSecurityModal.show()
      this.security = null
    },
    edit (security) {
      this.editMode = true
      this.$refs.madsSingleSectionModal.$refs.createEditSecurityModal.show()
      this.security = security
    },
    saveGateway () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id }
      let data = this.security
      if (this.editMode) {
        config = this.$_.assign(config, { id: this.security.id })
        gatewayService.update(config, data)
          .then((res) => {
            GatewayEventBus.$emit('reload-gateways')
          })
      } else {
        gatewayService.create(config, data)
          .then((res) => {
            GatewayEventBus.$emit('reload-gateways')
          })
      }
    },
    onCancel () {
    //   this.allSectionsVisited = false
    },
    genAccessToken () {
      this.security.access_token = (Math.random().toString(36) + 'uygsshssygugdugsssgvb').slice(2, 100 + 2)
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  }
}
</script>

<style lang="scss" scoped>
.heading{
    font-size: 25px;
    color: #000;
    font-weight: bold;
    width: 100%;
}
.main-panel{
    width: 100%;
}
</style>
