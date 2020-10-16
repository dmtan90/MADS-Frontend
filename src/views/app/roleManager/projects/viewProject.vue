<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'view-project-modal'"
    :modalRef="'viewProjectModal'"
    :viewMode="viewMode">
    <template v-slot:body-panel>
      <template v-if="projectInfo">
        <div class="heading">
          Project Information
        </div>
        <div class="info">
          <div class="info-box">
            <div class="title">Project Name</div>
            <div class="text">{{projectInfo.name || '-'}}</div>
          </div>
          <div class="info-box">
            <div class="title">Description</div>
            <div class="text">{{projectInfo.description || '-'}}</div>
          </div>
          <div class="info-box">
            <div class="title">Manager</div>
            <div class="text">{{renderFullName(projectInfo.leads)}}</div>
          </div>
          <div class="info-box">
            <div class="title">Members</div>
            <div class="text">{{renderFullName(projectInfo.users)}}</div>
          </div>
          <div class="info-box">
            <div class="title">Metadata</div>
            <div class="text">{{projectInfo.metadata}}</div>
          </div>
          <div class="info-box">
            <div class="title">Location</div>
            <div class="text"><a :href="projectInfo.locationUrl" target="_blank">{{projectInfo.locationName}}</a></div>
          </div>
          <div class="info-box">
            <div class="title">Created date</div>
            <div class="text">{{projectInfo.start_date}}</div>
          </div>
        </div>
      </template>
    </template>
  </mads-single-section-modal>
</template>

<script>
import madsSingleSectionModal from './../../shared/madsSingleSectionModal'

export default {
  props: {
    entityMapParentNode: {
      default: null
    }
  },
  components: {
    madsSingleSectionModal
  },
  data () {
    return {
      viewMode: false,
      projectInfo: null
    }
  },
  methods: {
    view (detail) {
      this.$refs.madsSingleSectionModal.$refs.viewProjectModal.show()
      this.projectInfo = {
        name: detail.name,
        description: detail.description,
        leads: detail.leads,
        users: detail.users,
        metadata: detail.metadata && detail.metadata.length ? detail.metadata.length : '-',
        locationName: detail.location && detail.location.name ? detail.location.name : '-',
        locationUrl: detail.location && detail.location.url ? detail.location.url : '',
        start_date: detail.start_date ? detail.start_date : '-'
      }
    },
    renderFullName (users) {
      users = this.$_.map(users, (user) => {
        return user.first_name + ' ' + user.last_name
      })
      return this.$_.join(users, ', ')
    }
  }
}
</script>

<style lang="scss" scoped>
.info{
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 30px;
  .avatar{
    margin-right: 40%;
    margin-bottom: 5%;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
  .info-box{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .title{
      font-size: 16px;
      font-weight: bold;
      width: 40%;
      color: #919EAB;
    }
    .text{
      font-size: 16px;
      width: 60%;
      color: #212B36;
    }
  }
}
.heading{
    font-size: 25px;
    color: #000;
    font-weight: bold;
    width: 100%;
}
.delete-box{
    font-size: 20px;
    margin-top: 40px;
    font-weight: bold;
}
.main-panel{
    width: 100%;
}
</style>

<style lang="scss">
.row{
  justify-content: center;
}
</style>
