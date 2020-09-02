<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search gateway"></b-form-input>
      </div>
      <div class="add-gateway" v-if="!source">
        <b-button @click="addGateway()">Add gateway</b-button>
      </div>
    </div>
    <div class="lists-table gateways-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="gatewaysArr"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:gateway="props">
          <span class="gateway-name" @click="onSelectGateway(props.rowData)">{{props.rowData.name}}</span>
        </template>
         <template v-slot:status>
          <span>Active</span>
        </template>
        <template v-slot:actions="props" v-if="!source">
          <span class="edit-gateway" @click="showGateway(props.rowData)">Show</span>
          <span class="edit-gateway" @click="editGateway(props.rowData)">Edit</span>
          <span class="delete-gateway" @click="deleteGateway(props.rowData)">Delete</span>
        </template>
      </vuetable>
    </div>

    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

    <!-- Modal Section -->
    <add-edit-gateway ref="addEditGateway"></add-edit-gateway>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import fieldsDef from './fieldsDef'
import Vuetable from 'vuetable-2'
import addEditGateway from './addEditGateway'
import gatewayService from '@/services/gateway.service'
import GatewayEventBus from './gatewayEventBus'
import madsPagination from '../../shared/madsPagination'


export default {
  props: {
    // gateways: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    source: {
      type: String,
      default: null
    }
  },
  components: {
    Vuetable,
    addEditGateway,
    madsPagination
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: '',
      currentPage: 1,
      perPage: 5,
      totalRows: null,
      gatewaysArr: []
    }
  },
  methods: {
    ...mapActions(['selectGateway']),
    loadGateways () {
      const config = {
        orgId: this.currentUser.org.id,
        projectId: this.selectedProject.id
      }

      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }
      gatewayService.read(config, params)
        .then((res) => {
          this.gatewaysArr = res.gateways
          this.totalRows = res.total_entries
          this.$emit('gateway-entry', res.total_entries)
        })
    },
    showGateway (detail) {
      this.selectGateway(detail)
      this.$emit('show-detail', detail)
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.loadGateways()
    },
    addGateway (gateway) {
      this.$refs.addEditGateway.add()
    },
    editGateway (gateway) {
      this.$refs.addEditGateway.edit(gateway)
    },
    deleteGateway (gateway) {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: gateway.id }
      gatewayService.delete(config)
        .then((response) => {
          GatewayEventBus.$emit('reload-gateways')
        })
    },
    onSelectGateway (gateway) {
      this.selectGateway(gateway)
      this.setEntityManagerCurrentPage(this.source)
    },
    getGatewayLocationUrl (gateway) {
      return gateway.location ? gateway.location.url : ''
    },
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  },
  mounted () {
    this.loadGateways()

    GatewayEventBus.$on('reload-gateways', () => {
      this.loadGateways()
    })
  },
  beforeDestroy () {
    GatewayEventBus.$off()
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
    .add-gateway {
      margin: 0 0 0 auto;
    }
  }
  .gateways-table {
    margin-top: 30px;
    .gateway-name {
      cursor: pointer;
    }
    .location {
      text-decoration: underline;
      color: #2aa7ff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit-gateway, .delete-gateway {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
