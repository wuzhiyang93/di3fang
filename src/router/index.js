import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    name: 'templateone',
    path: '/templateone',
    component: () => import('@/views/sitesetting/indexmanagement/indexconfig/templateone'),
    hidden: true
  },

  {
    path: '/updatepwd',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'updatepwd',
        component: () => import('@/views/login/password')
      }
    ]
  },

  {
    name: 'addthematicforvisual',
    path: '/addthematicforvisual',
    component: () => import('@/views/sitesetting/thematicsetting/thematiclist/addthematicforvisual'),
    hidden: true
  },

  {
    name: 'updatethematicforvisual',
    path: '/updatethematicforvisual',
    component: () => import('@/views/sitesetting/thematicsetting/thematiclist/updatethematicforvisual'),
    hidden: true
  },

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
