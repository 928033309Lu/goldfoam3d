/**
 * 在主框架内显示
 */
const frame = [{
        path: '/',
        redirect: {
            name: 'index'
        },
        component: () => import('@/views/index/layout.vue'),
        children: [
            // 首页 必须 name:index
            {
                // path: 'index/:projectId/:id/:isadmin/:token',
                path: 'index/:projectId/:id',
                name: 'index',
                meta: {
                    auth: true
                },
                component: () => import('@/views/index/index-view.vue')
            },
            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(vm => vm.$router.replace(from.fullPath))
                    },
                    render: h => h()
                }
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: {
                    beforeRouteEnter(to, from, next) {
                        next(vm => vm.$router.replace(JSON.parse(from.params.route)))
                    },
                    render: h => h()
                }
            }

        ]
    }, // 无效
    {
        path: '/nologin',
        name: 'nologin',
        component: () => import('@/views/error-page-nologin/error-page-view.vue')
    },
]

// /**
//  * 在主框架之外显示
//  */
// const loginView = [
//   // 登录
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/login/login-view.vue')
//   }
// ]

/**
 * 错误页面
 */
const errorPage = [
    // 404
    {
        path: '*',
        name: '404',
        component: () => import('@/views/error-page-404/error-page-view.vue')
    }
]

// 重新组织后导出
export default [
    ...frame,
    // ...loginView,
    ...errorPage
]