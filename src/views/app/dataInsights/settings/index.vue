<template>
  <div class="settings-container">
    <div class="settings-left-box">
      <div class="add-entity-box">
        <b-button class="add-entity-button" @click="addEntity()"
          >+ Add business Entities</b-button
        >
      </div>
      <template v-if="entities.length > 0">
        <div
          class="entities-box"
          v-for="(entity, index) in entities"
          :key="index"
        >
          <div
            class="entity-box"
            @click="showCriteriaForm(entity, index)"
            v-bind:class="{ active: index === selectedEntityIndex }"
          >
            <div class="entity-name-text">
              {{ entity.name }}
            </div>
            <div class="more-icon-dropdown">
              <b-button class="more-icon" @click="showDelete(index)"
                ><img src="../../../../assets/img/icons/more.svg"
              /></b-button>
              <div class="dropdown-box" v-if="isDelete && index === entityId">
                <b-button @click="deleteItem(index)">Delete</b-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="settings-right-box">
      <b-tabs pills card>
        <b-tab title="Criteria" active>
          <template v-if="selectedEntity">
            <criteria-form :entity="selectedEntity"></criteria-form>
          </template>
        </b-tab>
        <b-tab title="Fields">
          <template v-if="selectedEntity">
            <fields-section :fields="selectedEntity.fields"></fields-section>
          </template>
        </b-tab>
        <b-tab title="Relations"> </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import criteriaForm from './criteriaForm'
import fieldsSection from './fieldsSection'
import entityData from './entitiesData'

export default {
  components: {
    criteriaForm,
    fieldsSection
  },
  data () {
    return {
      isDelete: false,
      entities: entityData,
      entityId: null,
      selectedEntity: null,
      selectedEntityIndex: null
    }
  },
  computed: {},
  methods: {
    addEntity () {
      this.entities = this.$_.concat(this.entities, [
        {
          id: '',
          name: '',
          desc: '',
          hide: false,
          entityType: '',
          type: '',
          fields: []
        }
      ])
      this.selectedEntity = {
        id: '',
        name: '',
        desc: '',
        hide: false,
        entityType: '',
        type: ''
      }
    },
    showDelete (id) {
      this.isDelete = true
      this.entityId = id
    },
    deleteItem () {
      this.isDelete = false
    },
    showCriteriaForm (entity, index) {
      this.selectedEntity = entity
      this.selectedEntityIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  width: 100%;
  display: flex;
  min-height: calc(100vh - 105px);
  .settings-left-box {
    width: 20%;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    .add-entity-box {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      height: 48px;
      .add-entity-button {
        border: 0 !important;
        font-weight: bold;
        font-size: 15px;
      }
    }
    .entities-box {
      display: flex;
      flex-direction: column;
      .entity-box {
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        align-items: center;
        cursor: pointer;
        &.active {
          background-color: #2696f3;
          .entity-name-text {
            font-size: 17px;
            color: #fff;
          }
          .more-icon-dropdown {
            .more-icon {
              background-color: transparent !important;
              img {
                width: 22px;
                filter: brightness(0) invert(1);
              }
            }
          }
        }
        .entity-name-text {
          font-size: 17px;
          color: #1f1f1f;
        }
        .more-icon-dropdown {
          position: relative;
          .more-icon {
            border: 0 !important;
            padding: 0 !important;
            img {
              width: 22px;
            }
          }
          .dropdown-box {
            position: absolute;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.settings-right-box {
  width: 80%;
  .tabs {
    .card-header {
      padding: 0 !important;
      .card-header-pills {
        margin: 0 !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        li {
          width: 160px !important;
          height: 48px !important;
          .nav-link.active {
            background-color: transparent !important;
            border-bottom: 2px solid #2696f3 !important;
            color: rgba(0, 0, 0, 0.87) !important;
            font-size: 14px !important;
            border-radius: 0px !important;
            text-align: center !important;
            height: 100% !important;
          }
          .nav-link {
            background-color: transparent !important;
            border: 0px !important;
            color: rgba(0, 0, 0, 0.87) !important;
            font-size: 14px !important;
            border-radius: 0px !important;
            text-align: center !important;
            height: 100% !important;
          }
        }
      }
    }
    .tab-content {
      .card-body {
        padding: 0 !important;
      }
    }
  }
}
</style>
