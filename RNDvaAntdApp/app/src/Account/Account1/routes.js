/**
 * 路由定义
 */
export default (app, registerModel) => ({
  model: registerModel(app, require('./models').default),

  path: 'Account1',

  getComponent: require('./containers/Account1').default,
})
