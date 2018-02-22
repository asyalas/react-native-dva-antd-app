/**
 * 路由定义
 */
export default (app, registerModel) => ({
  model: registerModel(app, require('./models').default),

  path: 'Home1',
  getComponent: require('./containers/Home1').default,
})
