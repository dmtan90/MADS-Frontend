import Vue from "vue";
import Router from "vue-router";
import AuthRequired from "@/utils/AuthRequired";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "app" */ "@/views/app"),
    redirect: "/app/dashboard",
    beforeEnter: AuthRequired,
    children: [
      {
        path: "app/dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard" */ "@/views/app/dashboard")
      },
      {
        path: "app/device-configuration",
        component: () =>
          import(
            /* webpackChunkName: "device-configuration" */ "@/views/app/deviceConfiguration"
          ),
        redirect: "/app/device-configuration/devices",
        children: [
          {
            path: "sensor-types",
            component: () =>
              import(
                /* webpackChunkName: "sensorTypes" */ "@/views/app/deviceConfiguration/sensorTypes"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* sensorTypes */ "@/views/app/deviceConfiguration/sensorTypes/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* newSensorType */ "@/views/app/deviceConfiguration/sensorTypes/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* editSensorType */ "@/views/app/deviceConfiguration/sensorTypes/edit"
                  )
              }
            ]
          },
          {
            path: "devices",
            component: () =>
              import(
                /* webpackChunkName: "devices" */ "@/views/app/deviceConfiguration/devices"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* devices */ "@/views/app/deviceConfiguration/devices/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* newDevice */ "@/views/app/deviceConfiguration/devices/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* editDevice */ "@/views/app/deviceConfiguration/devices/edit"
                  )
              },
              {
                path: ":id",
                component: () =>
                  import(
                    /* deviceDetail */ "@/views/app/deviceConfiguration/devices/detail"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "app/site-layout",
        component: () =>
          import(/* webpackChunkName: "single" */ "@/views/app/SiteDesign"),
        children: [
          {
            path: "list-view",
            component: () =>
              import(
                /* webpackChunkName: "tmDashboard" */ "@/views/app/SiteDesign/listView"
              ),
            children: [
              {
                path: "",
                component: () => import("@/views/app/SiteDesign/listView/list")
              },
              {
                path: "new",
                component: () => import("@/views/app/SiteDesign/listView/new")
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* editSensorType */ "@/views/app/SiteDesign/listView/edit"
                  )
              }
            ]
          },
          {
            path: "",
            component: () =>
              import(
                /* webpackChunkName: "tmDashboard" */ "@/views/app/SiteDesign/map"
              )
          },
          {
            path: "tile",
            component: () =>
              import(
                /* webpackChunkName: "tmDashboard" */ "@/views/app/SiteDesign/tile"
              )
          }
        ]
      },
      {
        path: "app/notifications",
        component: () =>
          import(
            /* webpackChunkName: "notifications" */ "@/views/app/notifications"
          ),
        children: [
          {
            path: "",
            component: () =>
              import(/* notifications */ "@/views/app/notifications/list")
          },
          {
            path: "new",
            component: () =>
              import(/* newNotification */ "@/views/app/notifications/new")
          },
          {
            path: ":id/edit",
            component: () =>
              import(/* editNotification */ "@/views/app/notifications/edit")
          }
        ]
      },
      {
        path: "app/tool-management",
        component: () =>
          import(
            /* webpackChunkName: "tmDashboard" */ "@/views/app/toolManagement"
          ),
        redirect: "app/tool-management/dashboard",
        children: [
          {
            path: "dashboard",
            component: () =>
              import(
                /* webpackChunkName: "tmDashboard" */ "@/views/app/toolManagement/dashboard"
              )
          },
          {
            path: "employees",
            component: () =>
              import(
                /* webpackChunkName: "tmEmplooyees" */ "@/views/app/toolManagement/employees"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* webpackChunkName: "tmEmplooyees" */ "@/views/app/toolManagement/employees/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* webpackChunkName: "tmNewEmplooyee" */ "@/views/app/toolManagement/employees/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* webpackChunkName: "tmEditEmplooyee" */ "@/views/app/toolManagement/employees/edit"
                  )
              }
            ]
          },
          {
            path: "tools",
            name: "tools",
            component: () =>
              import(
                /* webpackChunkName: "tmTools" */ "@/views/app/toolManagement/tools"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* webpackChunkName: "tmTools" */ "@/views/app/toolManagement/tools/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* webpackChunkName: "tmNewTool" */ "@/views/app/toolManagement/tools/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* webpackChunkName: "tmEditTool" */ "@/views/app/toolManagement/tools/edit"
                  )
              }
            ]
          },
          {
            path: "tool-boxes",
            name: "tool-boxes",
            component: () =>
              import(
                /* webpackChunkName: "tmToolBoxes" */ "@/views/app/toolManagement/toolBoxes"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* webpackChunkName: "tmToolBoxes" */ "@/views/app/toolManagement/toolBoxes/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* webpackChunkName: "tmNewToolBox" */ "@/views/app/toolManagement/toolBoxes/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* webpackChunkName: "tmEditToolBox" */ "@/views/app/toolManagement/toolBoxes/edit"
                  )
              }
            ]
          },
          {
            path: "tool-types",
            name: "tool-types",
            component: () =>
              import(
                /* webpackChunkName: "tmToolTypes" */ "@/views/app/toolManagement/toolTypes"
              ),
            children: [
              {
                path: "",
                component: () =>
                  import(
                    /* webpackChunkName: "tmToolTypes" */ "@/views/app/toolManagement/toolTypes/list"
                  )
              },
              {
                path: "new",
                component: () =>
                  import(
                    /* webpackChunkName: "tmNewToolType" */ "@/views/app/toolManagement/toolTypes/new"
                  )
              },
              {
                path: ":id/edit",
                component: () =>
                  import(
                    /* webpackChunkName: "tmEditToolType" */ "@/views/app/toolManagement/toolTypes/edit"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "@/views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "@/views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/user/ForgotPassword")
      }
    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "@/views/Error")
  }
];

const router = new Router({
  linkActiveClass: "active",
  routes
});

export default router;
