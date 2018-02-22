/**
 * 路由定义
 */
export default (app, registerModel, registerRoute) => ({
    path: 'Account',
    getChildRoutes: [
      require('./Account3').routes(app, registerModel),
      require('./Account2').routes(app, registerModel),
    ],
    tabBar: true,
    getIndexRoute: require('./Account1').routes(app, registerModel),
    // pathName:'个人中心'
  })
