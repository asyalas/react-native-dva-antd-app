/**
 * 路由定义
 */
export default (app, registerModel) => ({
  path: 'Home3',
  model: registerModel(app, require('./models').default),

  // getChildRoutes: [
  //     require('../../Account').routes(app, registerModel),
  //   ],
  getComponent: require('./containers/Home3').default,
})
