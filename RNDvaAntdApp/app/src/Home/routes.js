/**
 * 路由定义
 */
export default (app, registerModel, registerRoute) => ({
    path: 'Home',
    getChildRoutes: [
      require('./Home3').routes(app, registerModel),
      require('./Home2').routes(app, registerModel),
    ],
    getIndexRoute: require('./Home1').routes(app, registerModel),
    tabBar: true,
  })
