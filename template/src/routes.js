// router路由定义
// 大部分都使用异步路由加载

const HelloWorld = () => import('@/components/HelloWorld')



/**
 * meta参数解析
 * hide_b_nav: 是否隐藏底部菜单
 * requireAuth: 是否验证用户登录：如果需要登录且没有登录，则跳到登录验证页
 */
const routes = [
    { path: '/', name: 'Index', component: HelloWorld, meta: {} },

    { path: '/index', name: 'Home', component: HelloWorld, meta: {}}
]


export default routes
