import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _794effcc = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _10ba8d22 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _49c57cf4 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _54450c4c = () => interopDefault(import('../pages/sellers.vue' /* webpackChunkName: "pages/sellers" */))
const _44a707a9 = () => interopDefault(import('../pages/sales/_seller_id.vue' /* webpackChunkName: "pages/sales/_seller_id" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _794effcc,
    name: "dashboard"
  }, {
    path: "/login",
    component: _10ba8d22,
    name: "login"
  }, {
    path: "/logout",
    component: _49c57cf4,
    name: "logout"
  }, {
    path: "/sellers",
    component: _54450c4c,
    name: "sellers"
  }, {
    path: "/sales/:seller_id?",
    component: _44a707a9,
    name: "sales-seller_id"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
