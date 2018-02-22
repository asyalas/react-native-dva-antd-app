/**
 * 路由定义
 */
export default (app, registerModel) => ({
    model: registerModel(app, require('./models').default),

    path: 'Home2',
    // getChildRoutes: [
    //     require('../Home3').routes(app, registerModel),
    //     require('../Home1').routes(app, registerModel)
    //   ],
    getComponent: require('./containers/Home2').default,
  })
