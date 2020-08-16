<template>
  <div class="tasks-inbox-wrap">
    <h2 class="page-heading">Hello {{currentUser.first_name}}, you have {{tasks.length}} tasks</h2>
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
    </vuetable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Vuetable } from 'vuetable-2'
import fields from './fieldsDef'
import taskService from '@/services/task.service'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: fields,
      tasks: [],
      statusTypes: ['un_resolved', 'resolved']
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
        page_size: 100,
        page_number: 1
      }

      taskService.read(config, params).then((res) => {
        loader.hide()
        this.tasks = res.tasks
      })
    },
    dateFormat (date) {
      return this.$moment(date).format('ddd, DD MMM | H:mm:ss')
    },
    getUserName (user) {
      return user.first_name + ' ' + (user.last_name || '')
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
