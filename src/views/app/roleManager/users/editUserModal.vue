<template>
  <b-modal id="edit-user-modal" ref="editUserModal" size="lg" hide-header hide-footer>
    <div class="edit-user-details">
      <div class="navigation">
        <ul class="sections">
          <li @click="section = 1" class="item">Edit User Details</li>
          <li @click="section = 2">Edit User Assets</li>
          <li @click="section = 3">Edit User Apps</li>
        </ul>
      </div>
      <div class="edit-section">
        <section v-if="section === 1" class="details">
          <h5>Edit User Details</h5>
          <b-form>
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" type="email" required></b-form-input>
            </b-form-group>
            <b-form-group label="Select Role" label-for="role">
              <b-dropdown id="dropdown-left" text="Select Role" v-model="selectedRole">
                <b-dropdown-item>Admin</b-dropdown-item>
                <b-dropdown-item>Managers</b-dropdown-item>
                <b-dropdown-item>Members</b-dropdown-item>
              </b-dropdown>
            </b-form-group>
            <b-form-group label="Select Teams">
              <b-form-tags v-model="value" no-outer-focus class="mb-2 team-section">
                <template v-slot="{ tags, disabled, addTag, removeTag }">
                  <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                      <b-form-tag
                        @remove="removeTag(tag)"
                        :title="tag"
                        :disabled="disabled"
                        variant="info"
                      >{{ tag }}</b-form-tag>
                    </li>
                  </ul>

                  <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                    <template v-slot:button-content>Choose teams</template>
                    <b-dropdown-item-button
                      v-for="option in availableOptions"
                      :key="option"
                      @click="onOptionClick({ option, addTag })"
                    >
                      {{ option }}
                    </b-dropdown-item-button>
                    <b-dropdown-text v-if="availableOptions.length === 0">
                      There are no teams available to select
                    </b-dropdown-text>
                  </b-dropdown>
                </template>
              </b-form-tags>
            </b-form-group>
          </b-form>
        </section>
        <section v-if="section === 2" class="assets">
          <h5>Edit User Assets</h5>
          <div class="assets-container">
            <tree-view ref="treeView" :treeData="treeData" :multiple="true" :halfcheck="true" v-if="treeData"></tree-view>
          </div>
        </section>
        <section v-if="section === 3" class="apps">
          <h5>Edit User Apps</h5>
          <apps-list></apps-list>
        </section>
        <div class="footer">
          <b-button @click="$bvModal.hide('edit-user-modal')">Cancel</b-button>
          <b-button @click="saveUser()">Save</b-button>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import organizationService from '@/services/organization.service'
import treeView from '../../shared/outlineTreeView'
import appsList from '../../shared/modalAppsList'

export default {
  components: {
    treeView,
    appsList
  },
  data () {
    return {
      section: 1,
      selectedRole: '',
      selectedTeam: [],
      options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
      value: [],
      treeData: null
    }
  },
  methods: {
    loadOrganization () {
      let config = { userId: this.currentUser.id }
      organizationService
        .read(config)
        .then(response => {
          this.orgData = response
          this.makeTreeData()
        })
    },
    formatSensorParameterData (entity) {
      let childrenPresent = (entity.type !== 'Parameter')
      let that = this
      if (childrenPresent) {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: (entity.type !== 'Sensor'),
          chkDisabled: (entity.type === 'Sensor'),
          children: this.$_.map(entity.entities, function (entity) {
            return that.formatSensorParameterData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          chkDisabled: true
        }
      }
    },
    formatAssetPropertyData (entity) {
      let isPropertiesPresent = entity.properties && this.$_.size(entity.properties) > 0
      let that = this
      if (!isPropertiesPresent) {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: true,
          children: this.$_.map(entity.entities, function (entity) {
            return that.formatAssetPropertyData(entity)
          })
        }
      } else {
        return {
          id: entity.id,
          type: entity.type,
          title: entity.name,
          expanded: true,
          children: this.$_.map(entity.properties, function (property) {
            return {
              chkDisabled: true,
              title: '<span draggable="true" class="draggable-element" data-name="' + property + '">' + property + '</span>'
            }
          })
        }
      }
    },
    makeTreeData () {
      let entity = this.orgData
      this.sensorParameterData = [this.formatSensorParameterData(entity)]
      this.treeData = this.sensorParameterData
      this.assetPropertyData = [this.formatAssetPropertyData(entity)]
    },
    saveUser () {
      this.$refs.editUserModal.hide()
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    availableOptions () {
      return this.options.filter(opt => this.value.indexOf(opt) === -1)
    }
  },
  mounted () {
    this.loadOrganization()
  }
}
</script>

<style lang="scss" scoped>
  .edit-user-details {
    display: flex;
    .navigation {
      padding: 20px;
      width: 30%;
      border-right: 1px solid #f3f3f3;
      .sections {
        padding-left: 0;
        margin-bottom: 0;
        li {
          list-style: none;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
    .edit-section {
      padding: 20px;
      width: 70%;
      height: 100%;
      .assets {
        margin: 0 auto;
        margin-bottom: 20px;
        .assets-container {
          height: 400px;
          overflow: scroll;
          border: 1px solid #efefef;
          padding: 20px 0 0;
        }
      }
    }
  }
</style>

<style lang="scss">
  #edit-user-modal {
    .modal-content {
      min-height: 600px;
    }
    .modal-body {
      padding: 0;
    }
  }
</style>
