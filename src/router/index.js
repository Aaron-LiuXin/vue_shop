import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果要去login登录页，直接next()放行
  if (to.path === '/login') return next()
  // 不去登录页，就要看有没有token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，不让去后台home页，强制跳转回登录页
  if (!tokenStr) return next('/login')
  // 有token，放行
  next()
})
export default router
