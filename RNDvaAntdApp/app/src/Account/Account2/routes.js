/**
 * 路由定义
 */
export default (app, registerModel) => ({
    model: registerModel(app, require('./models').default),
    path: 'Account2',

    getComponent: require('./containers/Account2').default,
  })
