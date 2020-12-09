import router from './router'
import store from './store'
import Layout from '@/layout'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/token' // get token from cookie
import {getMenus} from '@/api/user';
import {filterAsyncRouter} from './store/modules/permission'

NProgress.configure({showSpinner: false}) // NProgress Configuration

// 不需要拦截的路径
const whiteList = ['/login']

// 路由拦截器
router.beforeEach(async (to, from, next) => {

  // 加载基本信息
  try {
    await store.dispatch('getBaseInfoSet');
  } catch (err) {
    console.log(err)
  }

  // 加载中的导航条
  NProgress.start()

  if (to.meta.title) {
    // 设置标签名称
    document.title = to.meta.title + ' - ' + store.getters.baseinfoset.siteName;
  } else {
    // 设置标签名称
    document.title = store.getters.baseinfoset.siteName;
  }
  // 设置标签图片
  document.getElementById('page_icon').href = store.getters.baseinfoset.labelLog;

  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done();
    } else {
      // 判断是否已经拉取用户信息
      if (!store.getters.name) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('getInfo').then(() => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(() => {
          store.dispatch('logout').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  getMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res);

    // 判断是否有首页
    const index = hasIndex(asyncRouter);
    if (index) {
      asyncRouter.shift()
      // 第一个路由前面插入首页的页面
      asyncRouter.unshift({
        path: '/', redirect: index.path, component: Layout, children: [{
          path: 'dashboard',
          name: 'dashboard',
          component: index.component,
          meta: {title: index.meta.title, icon: index.meta.icon}
        }]
      });
    } else {
      // 第一个路由前面插入首页的页面
      asyncRouter.unshift({path: '/', redirect: getChildPath(asyncRouter[0], '')});
    }
    // 404 路由放最后面
    asyncRouter.push({path: '*', redirect: '/404', hidden: true})
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({...to, replace: true})// hack方法 确保addRoutes已完成
    })
  })
}

// 判断是否有首页
function hasIndex(routes) {
  if (routes && routes.length > 0) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].path == '/dashboard') {
        return routes[i];
      }
    }
  }
  return false;
}


// 获得最终子节点的路径
function getChildPath(route, path) {
  if (route.children && route.children.length) {
    let splitStr = route.path.indexOf('/') == 0 ? '' : '/';
    return getChildPath(route.children[0], path + splitStr + route.path);
  } else {
    return path + '/' + route.path;
  }
}


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
