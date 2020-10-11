<template>
  <div>
    <h3>Dashboard Settings</h3>
    <section v-if="selectedSectionIndex === 1">
      <b-form>
        <b-form-group label="Dashboard Name">
          <b-form-input v-model="dashboardData.name" type="text" id="dashboard-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Dashboard Background Color">
          <div class="color-wrap">
            <span>{{ dashboardData.settings.background_color }}</span>
            <b-form-input v-model="dashboardData.settings.background_color" type="color"></b-form-input>
          </div>
        </b-form-group>
        <b-form-group label="Sidebar Background Color">
          <div class="color-wrap">
            <span>{{ dashboardData.settings.sidebar_color }}</span>
            <b-form-input v-model="dashboardData.settings.sidebar_color" type="color"></b-form-input>
          </div>
        </b-form-group>
        <b-form-group label="Dashboard Thumbnail">
          <input type="file" @change="uploadThumbnail" />
          <div v-if="dashboardData.settings.thumbnail_url" class="thumbnail-preview" :style="{background: getThumbnailUrl()}">
          </div>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2">
      <b-form-group label="Client Name">
        <b-form-input v-model="dashboardData.settings.client_name" type="text" id="dashboard-name"></b-form-input>
      </b-form-group>
      <b-form-group label="Client Logo">
        <input type="file" @change="uploadLogo" />
      </b-form-group>
    </section>
    <section v-if="selectedSectionIndex === 3">
      <div class="lists-table panels-table">
        <vuetable
            ref="vuetable"
            :api-mode="false"
            :fields="fields"
            :data="panels"
          >
          <template v-slot:checkbox>
            <b-form-checkbox></b-form-checkbox>
          </template>
          <template v-slot:name="props">
            <span v-if="editedPanel !== props.rowData.id">{{props.rowData.name}}</span>
            <b-form-input v-if="editedPanel === props.rowData.id" v-model="props.rowData.name" type="text"></b-form-input>
          </template>
          <template v-slot:actions="props">
            <div v-if="editedPanel !== props.rowData.id">
              <svg class="icon pencil" @click="editPanel(props.rowData)">
                <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
              </svg>
              <svg class="icon dustbin" @click="deletePanel(props.rowData)">
                <use xlink:href="/assets/img/mads-common-icons.svg#dustbin"></use>
              </svg>
            </div>
            <div v-if="editedPanel === props.rowData.id">
              <svg class="icon tick" @click="updatePanel(props.rowData)">
                <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
              </svg>
            </div>
          </template>
        </vuetable>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fields from './panelFieldsDef'
import Vuetable from 'vuetable-2'
import dashboardService from '@/services/dashboard.service'
import imageService from '@/services/image.service'
import dasbhoardEventBus from './../dashboardBus'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      settings: {},
      fields: fields,
      dashboardData: {
        name: '',
        settings: {
          background_color: '#ffffff',
          client_name: '',
          sidebar_color: '#000000',
          thumbnail_url: ''
        }
      },
      panels: [],
      selectedLogo: null,
      editedPanel: null
    }
  },
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    uploadLogo (file) {
      this.selectedLogo = file.target.files[0]
    },
    uploadThumbnail (file) {
      let formData = new FormData()
      let thumbnail = file.target.files[0]

      formData.append('image', thumbnail, thumbnail.name)
      formData.append('path', 'dashboard')

      imageService.create(formData)
        .then((res) => {
          let settings = this.$_.merge({}, this.dashboardData.settings, { thumbnail_url: res.url })
          this.dashboardData = this.$_.merge({}, this.dashboardData, { settings: settings })
        })
    },
    getThumbnailUrl () {
      return "url('" + this.dashboardData.settings.thumbnail_url + "')"
    },
    getVisualSettings () {
      return {
        name: this.dashboardData.name,
        settings: {
          background_color: this.dashboardData.settings['background_color'],
          client_name: this.dashboardData.settings['client_name'],
          sidebar_color: this.dashboardData.settings['sidebar_color'],
          thumbnail_url: this.dashboardData.settings['thumbnail_url']
        }
      }
    },
    getClientSettings () {
      let formData = new FormData()
      if (this.selectedLogo && this.selectedLogo.name) {
        formData.append('image', this.selectedLogo, this.selectedLogo.name)
      }
      formData.append('name', this.dashboardData.name)
      formData.append('settings[background_color]', this.dashboardData.settings['background_color'])
      formData.append('settings[client_name]', this.dashboardData.settings['client_name'])
      formData.append('settings[sidebar_color]', this.dashboardData.settings['sidebar_color'])
      formData.append('settings[thumbnail_url]', this.dashboardData.settings['thumbnail_url'])

      return formData
    },
    editPanel (panel) {
      this.editedPanel = panel.id
    },
    deletePanel (panel) {
      let loader = this.$loading.show()
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: panel.id }

      dashboardService.deleteDashboardPanel(config)
        .then((response) => {
          dasbhoardEventBus.$emit('reload-dashboard')
          loader.hide()
        })
    },
    updatePanel (panel) {
      let loader = this.$loading.show()

      let params = { name: panel.name }
      let config = { orgId: this.currentUser.org.id, dashboardId: this.selectedDashboard.id, id: panel.id }

      dashboardService.updateDashboardPanel(config, params)
        .then((response) => {
          this.editedPanel = null
          dasbhoardEventBus.$emit('reload-dashboard')
          loader.hide()
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedDashboard'])
  },
  watch: {
    selectedDashboard () {
      this.panels = this.selectedDashboard.panels
    }
  },
  mounted () {
    this.panels = this.selectedDashboard.panels
    this.dashboardData = this.$_.merge({}, {
      name: this.selectedDashboard.name,
      settings: {
        background_color: this.selectedDashboard.settings ? this.selectedDashboard.settings['background_color'] : '#FFFFFF',
        client_name: this.selectedDashboard.settings ? this.selectedDashboard.settings['client_name'] || '' : '',
        sidebar_color: this.selectedDashboard.settings ? this.selectedDashboard.settings['sidebar_color'] : '#000000',
        thumbnail_url: this.selectedDashboard.settings ? this.selectedDashboard.settings['thumbnail_url'] : ''
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .color-wrap {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid #d7d7d7;
    width: 120px;
    height: 45px;
    border-radius: 4px;
    span {
      display: inline-block;
      color: #303033;
      width: 60px;
      text-transform: uppercase;
    }
    input {
      border: none;
      width: 35px;
      height: 38px;
      cursor: pointer;
      padding: 0;
      background-color: #F3F7FB !important;
    }
  }
  .thumbnail-preview {
    background-size: cover !important;
    background-position: center !important;
    width: 120px;
    height: 120px;
    margin-top: 20px;
    border-radius: 4px;
  }
  .panels-table {
    .icon {
      width: 26px;
      height: 26px;
      padding: 5px;
      border-radius: 13px;
      cursor: pointer;
      margin: 0 5px;
      &.pencil {
        background-color: #9BCCE5;
      }
      &.dustbin {
        background-color: #27AAE1;
      }
      &.tick {
        fill: #27AAE1;
        width: 40px;
        height: 40px;
      }
    }
  }
</style>
