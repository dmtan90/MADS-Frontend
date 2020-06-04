<template>
  <div>
    <b-modal id="entity-modal" ref="entityModal" size="md" hide-footer>
      <div class="entity-modal-body">
        <h3>Add {{entityType}} Entity</h3>
        <div class="entity-types">
          <div class="entity asset" @click="addAsset()">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-entity-manager-icons.svg#assets"></use>
            </svg>
            <span class="label">Asset</span>
          </div>
          <div class="entity sensor" @click="addSensor()">
            <svg class="icon">
              <use xlink:href="/assets/img/mads-entity-manager-icons.svg#sensors"></use>
            </svg>
            <span class="label">Sensor</span>
          </div>
        </div>
      </div>
      <div class="entity-modal-footer">
        <b-button @click="onCancel()">Cancel</b-button>
      </div>
    </b-modal>

    <add-asset ref="addAsset" @save-asset="onSaveAsset($event)" :source="'entity-map'" :entityMapParentNode="entityMapParentNode"></add-asset>
    <add-sensor ref="addSensor" @save-sensor="onSaveSensor($event)" :source="'entity-map'" :entityMapParentNode="entityMapParentNode"></add-sensor>
  </div>
</template>

<script>
import EntityManagerBus from '../entityManagerBus'
import EntityMapBus from './entityMapBus'
import addAsset from '../assets/addEditAsset'
import addSensor from '../sensors/addEditSensor'

export default {
  components: {
    addAsset,
    addSensor
  },
  props: {
    entityType: {
      type: String,
      required: true
    },
    entityMapParentNode: {
      default: null
    }
  },
  methods: {
    addAsset () {
      this.$refs.entityModal.hide()
      EntityManagerBus.$emit('open-mads-modal', 'createAssetModal')
    },
    addSensor () {
      this.$refs.entityModal.hide()
      EntityManagerBus.$emit('open-mads-modal', 'createSensorModal')
    },
    onSaveAsset (data) {
      EntityMapBus.$emit('add-entity', { entity: data, type: 'Asset' })
    },
    onSaveSensor (data) {
      EntityMapBus.$emit('add-entity', { entity: data, type: 'Sensor' })
    },
    onCancel () {
      this.$refs.entityModal.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
  .entity-modal-body {
    h3 {
      text-align: center;
      margin-top: 30px;
      text-transform: capitalize;
    }
    .entity-types {
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      .entity {
        padding: 20px;
        margin: 0 20px;
        position: relative;
        cursor: pointer;
        border-radius: 4px;
        .icon {
          width: 105px;
          height: 105px;
        }
        .label {
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
        }
        &.asset {
          background-color: #ffa07a;
        }
        &.sensor {
          background-color: #7ad9ff;
          .icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .entity-modal-footer {
    text-align: right;
    margin: 20px;
  }
</style>
