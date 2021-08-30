// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {  
      // 通过vuex state获取当前的token是否存在
      axios.get('/api/loginCheck').then((response)=>{
        // console.log("check: ")
        // console.log(response.data)
        if(response.data.status == 200){
          next();
        } else {
          next({
              name: 'Login'
          })
        }
      })
  }
  else {
      next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
