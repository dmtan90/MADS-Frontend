<template>
  <div class="tasks-inbox-wrap">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{totalRows}} tasks</h2>
    <vuetable ref="vuetable" :api-mode="false" :fields="fields" :data="tasks">
      <template v-slot:status>
        <span>
          Enabled
        </span>
      </template>
      <template v-slot:createdAt="props">
        <span>
          {{dateFormat(props.rowData.created_at)}}
        </span>
      </template>
      <template v-slot:createdBy="props">
        <span>
          {{getUserName(props.rowData.user)}}
        </span>
      </template>
      <template v-slot:type="props">
        <span>
          {{$_.lowerCase(props.rowData.type)}}
        </span>
      </template>
      <template v-slot:actions="props">
        <span class="delete-task" @click="deleteTask(props.rowData.id)">Delete</span>
      </template>
    </vuetable>

    <mads-pagination :perPage="perPage" :onChange="onPaginationChange" :currentPage="currentPage" :totalRows="totalRows"></mads-pagination>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fields from './fieldsDef'
import taskService from '@/services/task.service'
import madsPagination from '../../shared/madsPagination'

export default {
  components: {
    Vuetable,
    madsPagination
  },
  data () {
    return {
      fields: fields,
      tasks: [],
      statusTypes: ['un_resolved', 'resolved'],
      currentPage: 1,
      perPage: 5,
      totalRows: null
    }
  },
  methods: {
    loadTasks () {
      let loader = this.$loading.show()
      const config = {
        orgId: this.currentUser.org.id,
        userId: this.currentUser.id
      }

      const params = {
        page_size: this.perPage,
        page_number: this.currentPage
      }

      taskService.read(config, params).then((res) => {
        loader.hide()
        this.tasks = res.tasks
        this.totalRows = res.total_entries
      })
    },
    dateFormat (date) {
      return this.$moment(date).format('ddd, DD MMM | H:mm:ss')
    },
    getUserName (user) {
      return user.first_name + ' ' + (user.last_name || '')
    },
    onPaginationChange (e) {
      this.currentPage = e
      this.loadTasks()
    },
    deleteTask (taskId) {
      let loader = this.$loading.show()

      const config = {
        orgId: this.currentUser.org.id,
        userId: this.currentUser.id,
        id: taskId
      }

      taskService.delete(config)
        .then((res) => {
          loader.hide()
          this.loadTasks()
        })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted () {
    this.loadTasks()
  }
}
</script>

<style lang="scss" scoped>
  .tasks-inbox-wrap {
    width: 95%;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    .page-heading {
      color: #3e4956;
      margin-bottom: 30px;
    }
    .delete-task{
      text-decoration: underline;
      color: #2aa7ff;
      cursor: pointer;
      padding: 0 10px;
    }
  }
</style>

<style lang="scss">
  .tasks-inbox-wrap {
    td.app-name {
      text-transform: capitalize;
    }
    .multiselect {
      width: 180px;
    }
  }
</style>
