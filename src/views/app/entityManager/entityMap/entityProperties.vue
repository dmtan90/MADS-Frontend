<template>
  <div class="properties-container">
    <ul class="properties">
      <li class="property">
        <div class="header">
          <div class="property-name">
            <span>Name</span>
          </div>
          <svg class="icon pencil" @click="editName = true" v-if="!editName">
            <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
          </svg>
        </div>
        <div class="body">
          <div v-if="editName" class="edit-section">
            <b-form-input v-model="entity.name" type="text"></b-form-input>
            <svg class="icon" @click="editName = false">
              <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
            </svg>
          </div>
          <span class="value" v-else>
            {{entity.name || '-'}}
          </span>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <span>Entity</span>
          </div>
        </div>
        <div class="body">
          <span class="value">
            {{entity.type || '-'}}
          </span>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <span>Type</span>
          </div>
        </div>
        <div class="body">
          <span class="value">
            {{getEntityType()}}
          </span>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <span>Description</span>
          </div>
          <svg class="icon pencil" v-if="entity.type !== 'Organisation' && entity.type !== 'Project' && !editDescription" @click="editDescription = true">
            <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
          </svg>
        </div>
        <div class="body">
          <div v-if="editDescription" class="edit-section">
            <b-form-input v-model="entity.description" type="text"></b-form-input>
            <svg class="icon" @click="editDescription = false">
              <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
            </svg>
          </div>
          <span class="value" v-else>
            {{entity.description || '-'}}
          </span>
        </div>
      </li>
      <li class="property">
        <div class="header">
          <div class="property-name">
            <span>Metadata (Fixed Data)</span>
          </div>
          <svg class="icon pencil" v-if="entity.metadata && entity.metadata.length > 0 && !editMetadata" @click="editMetadata = true">
            <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
          </svg>
          <svg class="icon tick" v-if="editMetadata" @click="editMetadata = false">
            <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
          </svg>
        </div>
        <div class="body">
          <div v-if="entity.metadata && entity.metadata.length > 0">
            <div v-if="!editMetadata">
              <div v-for="(row, index) in entity.metadata" :key="index">
                <div class="list-section">
                  <span class="name">{{row.name}}</span>
                  <span class="value">{{row.value}}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-for="(row, index) in entity.metadata" :key="index">
                  <div class="edit-section list-section">
                    <span class="name">{{row.name}}</span>
                    <b-form-input v-model="row.value" type="text"></b-form-input>
                  </div>
              </div>
            </div>
          </div>
          <span v-else>-</span>
        </div>
      </li>
      <li class="property" v-if="entity.type !== 'Organisation' && entity.type !== 'Project'">
        <div class="header">
          <div class="property-name">
            <span>Parameters (Streaming Data)</span>
          </div>
          <svg class="icon pencil" v-if="entity.parameters && entity.parameters.length > 0 && !editParameters" @click="editParameters = true">
            <use xlink:href="/assets/img/mads-common-icons.svg#pencil"></use>
          </svg>
          <svg class="icon tick" v-if="editParameters" @click="editParameters = false">
            <use xlink:href="/assets/img/mads-common-icons.svg#tick"></use>
          </svg>
        </div>
        <div class="body">
          <div v-if="entity.parameters && entity.parameters.length > 0">
            <div v-if="!editParameters">
              <div v-for="(row, index) in entity.parameters" :key="index">
                <div class="list-section">
                  <span class="name">{{row.name}}</span>
                  <span class="value">{{row.value}}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div v-for="(row, index) in entity.parameters" :key="index">
                  <div class="edit-section list-section">
                    <span class="name">{{row.name}}</span>
                    <b-form-input v-model="row.value" type="text"></b-form-input>
                  </div>
              </div>
            </div>
          </div>
          <span v-else>-</span>
        </div>
      </li>
    </ul>
    <div class="footer" v-if="entity.type !== 'Organisation' && entity.type !== 'Project'">
      <b-button class="delete-btn" @click="onDelete()" v-if="!entity.entities || !entity.entities.length">Delete</b-button>
      <b-button class="save-btn" @click="onSave()">Save</b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import assetService from '@/services/asset.service'
import sensorService from '@/services/sensor.service'
import TreeEventBus from './../../shared/madsTree/treeEventBus'

export default {
  props: ['entityData'],
  data () {
    return {
      entity: '',
      editName: false,
      editDescription: false,
      editMetadata: false,
      editParameters: false
    }
  },
  methods: {
    getEntityType () {
      let type = this.entity.type
      switch (type) {
        case 'Organisation':
        case 'Project':
          return '-'
        case 'Asset':
          return this.entity.asset_type.name
        case 'Sensor':
          return this.entity.sensor_type.name
      }
    },
    onDelete () {
      // this.$emit('delete-entity')
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: this.entity.id }
      if (this.entity.type === 'Asset') {
        assetService.delete(config)
          .then((response) => {
            this.$emit('entity-deleted')
            TreeEventBus.$emit('reload-entities')
          })
      } else {
        sensorService.delete(config)
          .then((response) => {
            this.$emit('entity-deleted')
            TreeEventBus.$emit('reload-entities')
          })
      }
    },
    onSave () {
      let config = { orgId: this.currentUser.org.id, projectId: this.selectedProject.id, id: this.entity.id }
      if (this.entity.type === 'Asset') {
        assetService.update(config, this.entity)
          .then((response) => {
            TreeEventBus.$emit('reload-entities')
            this.editName = false
            this.editDescription = false
            this.editMetadata = false
            this.editParameters = false
          })
      } else {
        sensorService.update(config, this.entity)
          .then((response) => {
            TreeEventBus.$emit('reload-entities')
            this.editName = false
            this.editDescription = false
            this.editMetadata = false
            this.editParameters = false
          })
      }
    }
  },
  watch: {
    entityData (data) {
      this.entity = data
    }
  },
  mounted () {
    this.entity = this.entityData
  },
  computed: {
    ...mapGetters(['currentUser', 'selectedProject'])
  }
}
</script>

<style lang="scss" scoped>
  .properties-container {
    position: relative;
    height: 100%;
    .properties {
      list-style: none;
      padding: 0;
      margin: 0;
      height: calc(100% - 70px);
      overflow: auto;
      .property {
        border-bottom: 1px solid #c8cbce;
        padding: 15px;
        .header {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 10px;
          .property-name {
            padding: 0 15px 0 0;
            font-size: 15px;
            text-transform: capitalize;
            font-weight: 700;
          }
          .icon {
            cursor: pointer;
            &.pencil {
              width: 15px;
              height: 15px;
              fill: #4c92c3;
            }
            &.tick {
              width: 24px;
              height: 24px;
              fill: #4c92c3;
            }
          }
        }
        .body {
          .name, .value {
            width: calc(50% - 15px);
            display: inline-block;
            text-transform: capitalize;
            color: #212121;
          }
          .edit-section {
            display: flex;
            align-items: center;
            input {
              width: calc(100% - 39px);
              height: 35px;
            }
            .icon {
              width: 24px;
              height: 24px;
              margin: 0 0 0 auto;
              fill: #4c92c3;
              cursor: pointer;
            }
          }
          .list-section {
            margin: 15px 0;
            .name {
              font-weight: 700;
              font-size: 14px;
            }
          }
        }
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
    .footer {
      padding: 10px;
      height: 70px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      border-top: 1px solid #c8cbce;
      background-color: white;
      .delete-btn {
        background-color: #F32013 !important;
        color: #ffffff !important;
        height: 45px;
      }
      .save-btn {
        background-color: #4c92c3 !important;
        color: #ffffff !important;
        height: 45px;
        margin-left: 10px;
      }
    }
  }
</style>
