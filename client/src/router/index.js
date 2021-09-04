import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: localStorage.getItem('token') === null ? '/login' : '/dashboard'
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
    meta: { requiresLoggedOut: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresLoggedOut: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresLoggedIn: true }
  },
  {
    path: '/expense',
    name: 'Expenses',
    component: () => import('@/views/Expenses.vue'),
    meta: { requiresLoggedIn: true }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/Report.vue'),
    meta: { requiresLoggedIn: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout.vue'),
    meta: { requiresLoggedIn: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var requiresLoggedIn = to.matched.some(m => m.meta.requiresLoggedIn)
  var requiresLoggedOut = to.matched.some(m => m.meta.requiresLoggedOut)
  if (requiresLoggedIn) {
    if (localStorage.getItem('token') === null) {
      console.log('User is not logged in - redirect to home page')
      next({ path: '/login' })
    } else {
      next()
    }
  } else if (requiresLoggedOut) {
    if (localStorage.getItem('token') !== null) {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
