import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ '@/views/app'),
    redirect: '/app/dashboard',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/dashboard')
      },
      {
        path: 'app/device-configuration',
        component: () => import(/* webpackChunkName: "device-configuration" */ '@/views/app/deviceConfiguration'),
        redirect: '/app/device-configuration/devices',
        children: [
          {
            path: 'sensor-types',
            component: () => import(/* webpackChunkName: "sensorTypes" */ '@/views/app/deviceConfiguration/sensorTypes'),
            children: [
              { path: '', component: () => import(/* sensorTypes */ '@/views/app/deviceConfiguration/sensorTypes/list') },
              { path: 'new', component: () => import(/* newSensorType */ '@/views/app/deviceConfiguration/sensorTypes/new') },
              { path: ':id/edit', component: () => import(/* editSensorType */ '@/views/app/deviceConfiguration/sensorTypes/edit') }
            ]
          },
          {
            path: 'devices',
            component: () => import(/* webpackChunkName: "devices" */ '@/views/app/deviceConfiguration/devices'),
            children: [
              { path: '', component: () => import(/* devices */ '@/views/app/deviceConfiguration/devices/list') },
              { path: 'new', component: () => import(/* newDevice */ '@/views/app/deviceConfiguration/devices/new') },
              { path: ':id/edit', component: () => import(/* editDevice */ '@/views/app/deviceConfiguration/devices/edit') },
              { path: ':id', component: () => import(/* deviceDetail */ '@/views/app/deviceConfiguration/devices/detail') }
            ]
          }
        ]
      },
      {
        path: 'app/factory-layout',
        component: () => import(/* webpackChunkName: "single" */ '@/views/app/factoryDesign')
      },
      {
        path: 'app/notifications',
        component: () => import(/* webpackChunkName: "notifications" */ '@/views/app/notifications'),
        children: [
          { path: '', component: () => import(/* notifications */ '@/views/app/notifications/list') },
          { path: 'new', component: () => import(/* newNotification */ '@/views/app/notifications/new') },
          { path: ':id/edit', component: () => import(/* editNotification */ '@/views/app/notifications/edit') }
        ]
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ '@/views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ '@/views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ '@/views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes
})

export default router
