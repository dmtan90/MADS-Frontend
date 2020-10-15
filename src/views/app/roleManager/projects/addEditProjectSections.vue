<template>
  <div class="project-sections">
    <h3>{{editMode ? 'Edit' : 'Add'}} Project</h3>
    <section v-if="selectedSectionIndex === 1" class="details">
      <b-form>
        <b-form-group label="Project Name" label-for="project-name">
          <b-form-input v-model="project.name" type="text" id="project-name"></b-form-input>
        </b-form-group>
        <b-form-group label="Project Description" label-for="project-description" class="description">
          <b-form-textarea v-model="project.description" id="project-description" rows="6" max-rows="6"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Project Location" class="project-location">
          <div class="google-search-box-wrap">
            <b-form-input id="google-search-box" autocomplete="off"></b-form-input>
            <a :href="selectedLocationUrl" target="_blank" class="marker-wrap" v-if="selectedLocationUrl">
              <svg class="icon">
                <use xlink:href="/assets/img/mads-common-icons.svg#google-marker"></use>
              </svg>
            </a>
          </div>
        </b-form-group>
        <b-form-group label="Project Image">
          <input type="file" @change="uploadImage" />
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 2" class="people">
      <b-form>
        <b-form-group label="Project Members">
          <multiselect v-model="project.user_ids" :options="users" :multiple="true" :select-label="''" :selected-label="''" :deselect-label="''" :custom-label="getUserName" track-by="id"></multiselect>
        </b-form-group>
        <b-form-group label="Project Managers">
          <multiselect v-model="project.lead_ids" :options="users" :multiple="true" :select-label="''" :selected-label="''" :deselect-label="''" :custom-label="getUserName" track-by="id"></multiselect>
        </b-form-group>
      </b-form>
    </section>
    <section v-if="selectedSectionIndex === 3" class="metadata">
       <div class="metadata-group">
        <b-form class="horizontal-form" v-for="(metadata, index) in project.metadata" :key="index">
          <b-form-group :label="(index === 0) ? 'Metadata Name(key)' : ''" class="name">
            <b-form-input v-model="metadata.name" type="text"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Data Type' : ''" class="data-type">
            <multiselect v-model="metadata.data_type" :options="dataTypes" placeholder="" :select-label="''" :selected-label="''" :deselect-label="''">
            </multiselect>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Unit' : ''" class="unit">
            <b-form-input v-model="metadata.unit"></b-form-input>
          </b-form-group>
          <b-form-group :label="(index === 0) ? 'Value' : ''" class="value">
            <b-form-input v-model="metadata.value"></b-form-input>
          </b-form-group>
          <svg class="icon" @click="removeMetadata(index)">
            <use xlink:href="/assets/img/mads-common-icons.svg#minus"></use>
          </svg>
        </b-form>
        <b-button class="add-new-row" @click="addNewMetadata()">
          <svg class="icon">
            <use xlink:href="/assets/img/mads-common-icons.svg#plus"></use>
          </svg>
          <span class="text">Add New</span>
        </b-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userService from '@/services/user.service'
import dataTypeService from '@/services/dataType.service'

export default {
  props: {
    selectedSectionIndex: {
      type: Number,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    },
    projectData: {
      type: Object
    }
  },
  data () {
    return {
      users: [],
      project: {},
      selectedFile: null,
      selectedLocationUrl: null
    }
  },
  methods: {
    loadDataTypes () {
      this.dataTypes = dataTypeService.read()
    },
    loadUsers () {
      let config = { orgId: this.currentUser.org.id }
      userService.read(config, { page_size: 100 })
        .then((response) => {
          this.users = response.users
        })
    },
    addNewMetadata () {
      let metadata = this.$_.concat(this.project.metadata, [{ name: '', data_type: '', unit: '', value: '' }])
      this.project = this.$_.assign(this.project, { metadata: metadata })
    },
    getUserName (user) {
      return user.first_name + ' ' + (user.last_name || '')
    },
    getProjectData () {
      let leadIds = this.$_.map(this.project.lead_ids, (lead) => {
        return lead.id
      })
      let userIds = this.$_.map(this.project.user_ids, (user) => {
        return user.id
      })

      let projectData = this.$_.merge(this.project, {
        lead_ids: leadIds,
        user_ids: userIds,
        image: this.selectedFile
      })

      this.$_.remove(this.project.metadata, (metadata) => { return !metadata.name })

      return projectData
    },
    initGoogleSearch () {
      let input = document.getElementById('google-search-box')
      let options = {
        types: ['establishment']
      }

      let autocomplete = new google.maps.places.Autocomplete(input, options)

      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace()

        let name = document.getElementById('google-search-box').value

        this.project = this.$_.merge(this.project, {
          location: {
            name: name,
            place_id: place.place_id,
            url: place.url
          }
        })
        this.selectedLocationUrl = place.url || null
      })
    },
    uploadImage (file) {
      this.selectedFile = file.target.files[0]
    },
    removeMetadata (index) {
      this.project.metadata.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.initGoogleSearch()
    this.loadDataTypes()
    this.loadUsers()

    if (this.projectData) {
      this.project = {
        name: this.projectData.name || '',
        description: this.projectData.description || '',
        location: this.projectData.location || {},
        lead_ids: [],
        user_ids: [],
        metadata: this.$_.size(this.projectData.metadata) ? this.projectData.metadata : [],
        creator_id: this.projectData.creator_id
      }

      if (this.project.location) {
        document.getElementById('google-search-box').value = this.project.location.name
        this.selectedLocationUrl = this.project.location.url
      }
    } else {
      this.project = {
        name: '',
        description: '',
        location: {},
        lead_ids: [],
        user_ids: [],
        metadata: [{ name: '', data_type: '', unit: '', value: '' }],
        creator_id: this.currentUser.id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .project-sections {
    height: 480px;
    overflow: auto;
  }
  h3 {
    margin-bottom: 20px;
  }
  .details {
    .description {
      height: 165px;
    }
    .project-location {
      .google-search-box-wrap {
        position: relative;
        input {
          padding-right: 60px;
        }
        .marker-wrap {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          height: 85%;
          width: 45px;
          background: #FFA07A;
          border-radius: 2px;
        }
        .icon {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 21px;
          height: 21px;
          cursor: pointer;
          fill: #ffffff;
        }
      }
    }
  }
  .metadata-group {
    margin-bottom: 45px;
    .horizontal-form {
      .name {
        width: 30%;
        margin-right: 5px;
      }
      .data-type {
        width: 20%;
        margin-right: 5px;
      }
      .unit {
        width: 15%;
      }
      .value {
        width: 25%;
      }
      .icon {
        width: 24px;
        height: 24px;
        fill: #d11a2a;
        cursor: pointer;
      }
    }
    .add-new-row {
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      .icon {
        width: 24px;
        height: 24px;
        fill: #60C977;
      }
      .text {
        font-size: 15px;
        padding-left: 5px;
      }
    }
  }
</style>

<style lang="scss">
  .modal-body {
    padding: 0;
    .right-panel {
      padding-bottom: 100px;
      .horizontal-form {
        display: flex;
        align-items: center;
        fieldset {
          display: inline-block;
        }
      }
    }
  }
</style>
