import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Task from '@/components/Task'
import Screen from '@/components/Screen'
import Login from '@/components/Login'
import CommonView from '@/components/CommonView'
import axios from 'axios'

Vue.use(Router)

// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'CommonView',
      component: CommonView,
      children : [
          {
            path: '/',
            name: 'Index',
            component: Index,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/task',
            name: 'Task',
            component: Task,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/screen',
            name: 'Screen',
            component: Screen,
            meta: {
              requireAuth: true
            }
          }
      ]
    }
  ]
})
