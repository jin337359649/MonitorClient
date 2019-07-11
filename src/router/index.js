import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/devices',
    name: 'Example',
    meta: { title: '设备管理', icon: 'example' },
    children: [
      {
        path: 'home',
        name: '车型列表',
        hidden: true,
        component: () => import('@/views/home/Index'),
        meta: { title: '车型列表', icon: 'table' }
      },
      {
        path: 'devices',
        name: '设备列表',
        component: () => import('@/views/devicelist/index'),
        meta: { title: '设备列表', icon: 'table' }
      },
      {
        path: 'GarbageCar',
        name: 'GarbageCar',
        hidden: true,
        component: () => import('@/views/devicedetail/GarbageCar'),
        meta: { title: '环卫车', icon: 'table' }
      },
      {
        path: 'FireCar',
        name: 'FireCar',
        hidden: true,
        component: () => import('@/views/devicedetail/FireCar'),
        meta: { title: '消防车', icon: 'table' }
      },
      {
        path: 'AirConditioner',
        name: 'AirConditioner',
        hidden: true,
        component: () => import('@/views/devicedetail/AirConditioner'),
        meta: { title: '空调机', icon: 'table' }
      },
      {
        path: 'ShowLog',
        name: 'ShowLog',
        hidden: true,
        component: () => import('@/views/devicedetail/HistoryLog'),
        meta: { title: '日志数据', icon: 'table' }
      },
      {
        path: 'CarReplay',
        name: 'CarReplay',
        hidden: true,
        component: () => import('@/views/map/CarReplay'),
        meta: { title: '轨迹回放', icon: 'table' }
      },
      {
        path: 'map',
        name: '设备分布',
        component: () => import('@/views/map/index'),
        meta: { title: '设备分布', icon: 'eye' }
      }
    ]
  },
  {
    path: '/mqtt',
    component: Layout,
    redirect: '/mqtt/client',
    name: 'mqtt',
    meta: { title: 'MQTT助手', icon: 'example' },
    children: [
      {
        path: 'mqttclient',
        name: 'mqttclient',
        component: () => import('@/views/mqtt/index'),
        meta: { title: 'MQTT监控', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/example/home', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
