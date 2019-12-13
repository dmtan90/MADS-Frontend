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
        redirect: '/app/device-configuration/sensor-type',
        children: [
          {
            path: 'sensor-type',
            component: () => import(/* webpackChunkName: "sensor-type" */ '@/views/app/deviceConfiguration/SensorType')
          },
          {
            path: 'device',
            component: () => import(/* webpackChunkName: "devices" */ '@/views/app/deviceConfiguration/Device')
          },
          {
            path: 'device/:id',
            component: () => import(/* webpackChunkName: "devices" */ '@/views/app/deviceConfiguration/DeviceDetails')
          },
          {
            path: 'sensor/:id',
            component: () => import(/* webpackChunkName: "sensors" */ '@/views/app/deviceConfiguration/Sensor')
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
          { path: 'new', component: () => import(/* notifications */ '@/views/app/notifications/new') },
          { path: ':id/edit', component: () => import(/* notifications */ '@/views/app/notifications/edit') }
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
  routes,
  mode: 'history'
})

export default router
