import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/app/device-configuration',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/device-configuration',
        component: () => import(/* webpackChunkName: "device-configuration" */ './views/app/deviceConfiguration'),
        redirect: '/app/device-configuration/sensor-type',
        children: [
          {
            path: 'sensor-type',
            component: () => import(/* webpackChunkName: "sensor-type" */ './views/app/deviceConfiguration/SensorType')
          },
          {
            path: 'devices',
            component: () => import(/* webpackChunkName: "devices" */ './views/app/deviceConfiguration/Devices')
          },
          {
            path: 'devices/:id',
            component: () => import(/* webpackChunkName: "devices" */ './views/app/deviceConfiguration/Device')
          },
          {
            path: 'sensors/:id',
            component: () => import(/* webpackChunkName: "sensors" */ './views/app/deviceConfiguration/Sensors')
          }
        ]
      },
      {
        path: 'app/second-menu',
        component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu'),
        redirect: '/app/second-menu/second',
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu/Second') }
        ]
      },
      {
        path: 'app/single',
        component: () => import(/* webpackChunkName: "single" */ './views/app/single')
      },
      {
        path: 'app/factory-layout',
        component: () => import(/* webpackChunkName: "single" */ './views/app/factoryDesign')
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
