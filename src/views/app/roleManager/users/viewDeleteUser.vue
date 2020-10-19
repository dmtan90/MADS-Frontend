<template>
  <mads-single-section-modal
    ref="madsSingleSectionModal"
    :modalID="'view-delete-user-modal'"
    :modalRef="'viewDeleteUserModal'"
    :viewMode="viewMode"
    :deleteMode="isDelete"
    @on-delete="deleteUser()">
    <template v-slot:body-panel>
      <template v-if="!isDelete">
        <div class="heading">
          User Information
        </div>
        <div class="info">
          <div class="avatar">
            <img v-if="userInfo.image" :src="userInfo.image" />
            <img v-else :src="require(`@/assets/img/avatars/${randomSelector(avatars)}.jpg`)" :alt="randomSelector(avatars)" />
          </div>
          <div class="info-box">
            <div class="title">Name</div>
            <div class="text">{{userInfo.name}}</div>
          </div>
          <div class="info-box">
            <div class="title">Email</div>
            <div class="text">{{userInfo.email}}</div>
          </div>
          <div class="info-box">
            <div class="title">Role</div>
            <div class="text">{{userInfo.role}}</div>
          </div>
          <div class="info-box">
            <div class="title">Last Login At</div>
            <div class="text">{{userInfo.lastLogin}}</div>
          </div>
          <div class="info-box">
            <div class="title">Apps</div>
            <div class="text">7</div>
          </div>
          <div class="info-box">
            <div class="title">Assets</div>
            <div class="text">7</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="delete-box">
          Are you sure you want to delete?
        </div>
      </template>
    </template>
  </mads-single-section-modal>
</template>

<script>
import madsSingleSectionModal from './../../shared/madsSingleSectionModal'
import userService from '@/services/user.service'
import EventBus from './../eventBus'
import { mapGetters } from 'vuex'

export default {
  props: {
    entityMapParentNode: {
      default: null
    },
    isDelete: {
      default: false
    }
  },
  components: {
    madsSingleSectionModal
  },
  data () {
    return {
      viewMode: false,
      userInfo: {},
      avatars: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ],
      userId: null
    }
  },
  methods: {
    view (detail) {
      this.$refs.madsSingleSectionModal.$refs.viewDeleteUserModal.show()
      this.userInfo = {
        name: detail.user,
        email: detail.email,
        role: detail.role,
        image: detail.otherInfo.image,
        lastLogin: detail && detail.otherInfo && detail.otherInfo.user_setting && detail.otherInfo.user_setting.data_settings.last_login_at ? detail.otherInfo.user_setting.data_settings.last_login_at : '-',
        apps: [],
        assets: []
      }
    },
    delete (detail) {
      this.userId = detail.id
      this.$refs.madsSingleSectionModal.$refs.viewDeleteUserModal.show()
    },
    deleteUser () {
      let config = { orgId: this.currentUser.org.id, userId: this.userId }

      userService.delete(config)
        .then((res) => {
          EventBus.$emit('reload-user-list')
        })
    },
    randomSelector (arr) {
      const randomItem = this.$_.sample(arr)
      return randomItem
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  beforeDestroy () {
    EventBus.$off()
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
