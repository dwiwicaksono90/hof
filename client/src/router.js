import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import AddThread from './views/AddThread.vue'
import ThreadDetail from './views/ThreadDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/thread/add',
      name: 'addThread',
      component: AddThread
    },
    {
      path: '/thread/:id',
      name: 'threadDetail',
      component: ThreadDetail
    }
  ]
})