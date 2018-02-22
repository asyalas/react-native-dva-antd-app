/**
 * 路由定义
 */
export default (app, registerModel) => ({
  model: registerModel(app, require('./models').default),
  path: 'Account3',

  getComponent: require('./containers/Account3').default,
})
