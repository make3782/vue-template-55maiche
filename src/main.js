// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Lockr from 'lockr'
import store from './store'     //引入vuex



Vue.config.productionTip = false

///////////////////////////////////
// 引入本项目相关JS
//////////////////////////////////
import _g from './assets/js/global'     // 公共方法JS
import filter from './assets/js/filter' // 过滤filterJS


///////////////////////////////////
// 加载公用CSS
//////////////////////////////////
import 'assets/css/global.css'

///////////////////////////////////
// 引入nprogress进度条
///////////////////////////////////
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

///////////////////////////////////
// 路由解析
///////////////////////////////////

// 引入路由
import routes from './routes'
import VueRouter from 'vue-router'
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})

// 路由过滤判断等
router.beforeEach((to, from, next) => {
    const hideLeft = to.meta.hideLeft
    store.dispatch('showLoading', true)
    NProgress.start()

    //判断底部导航是否出现
    if (to.meta.hide_b_nav) {
        store.commit('showBottomMenu', false)
    } else {
        store.commit('showBottomMenu', true)
    }

    // 统计代码
    // if (from.name) {
    //     _hmt.push(['_trackPageview', to.fullPath, window.location.origin]);
    // } else {
    //     _hmt.push(['_trackPageview', to.fullPath]);
    // }

    //一些全局数据获取



    if (to.meta.requireAuth) {      //判断是否需要登录
        if (Lockr.get("auth_key")) {
            next();
        } else {
            Lockr.set("redirect", to.fullPath)
            next({
                path: '/login_in',
                query: { redirect: to.fullPath }  //登录成功后跳转回请求的路由
            })
        }
    } else { //不需要登录的情况
        next()
    }

})
router.afterEach(transition => {
    //document.body.scrollTop = 0
    //document.documentElement.scrollTop = 0
    NProgress.done()
})
Vue.use(VueRouter)

/////////////////////////////////////////////
// 将常用插件注入到浏览器全局中，可以随时使用
/////////////////////////////////////////////
window.router = router
window.store = store
window.HOST = HOST
// window.CDN_URL = CDN_URL
//window.axios = axios
// window._ = _
window.Lockr = Lockr
window._g = _g


/* eslint-disable no-new */
new Vue({
    el: '#app',
    filters: filter,
    router,
    template: '<App/>',
    store,
    components: { App }
})
