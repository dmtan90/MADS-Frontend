<template>
  <div>
    <div class="table-options">
      <div class="search-box">
        <b-form-input v-model="searchText" placeholder="Search task"></b-form-input>
      </div>
      <div class="add-task" v-if="!source">
        <b-button @click="addTask()">Add task</b-button>
      </div>
    </div>
    <div class="lists-table tasks-table">
      <vuetable
          ref="vuetable"
          :api-mode="false"
          :fields="fields"
          :data="tasks"
        >
        <template v-slot:checkbox>
          <b-form-checkbox></b-form-checkbox>
        </template>
        <template v-slot:task="props">
          <span class="task-name" @click="onSelectTask(props.rowData)">{{props.rowData.name}}</span>
        </template>
        <template v-slot:actions="">
          <span class="edit-task">Edit</span>
          <span class="delete-task">Delete</span>
        </template>
      </vuetable>
    </div>

    <!-- Modal Section -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fieldsDef from './taskFieldsDef'
import Vuetable from 'vuetable-2'

export default {
  props: {
    tasks: {
      type: Array,
      default: () => {
        return []
      }
    },
    source: {
      type: String,
      default: null
    }
  },
  components: {
    Vuetable
  },
  data () {
    return {
      fields: fieldsDef,
      searchText: ''
    }
  },
  methods: {
    addTask (task) {
      this.$emit('new-task')
    },
    onSelectTask (task) {
      this.$emit('select-task', task)
    },
    renderUserName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name
      })
      return this.$_.join(users, ', ')
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
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
    .add-task {
      margin: 0 0 0 auto;
    }
  }
  .tasks-table {
    margin-top: 30px;
    .task-name {
      cursor: pointer;
    }
    .location {
      text-decoration: underline;
      color: #2aa7ff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .edit-task, .delete-task {
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>
