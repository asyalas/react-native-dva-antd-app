import React from 'react'
import { create } from 'dva-core'
import { Provider, connect } from 'react-redux'

import createLoading from 'dva-loading'

export { connect }
// 注册model
const registerModel = (app, model) => {
  if (!app._models.some(m => m.namespace === model.namespace)) {
    app.model(model)
  }
  return model
}
// 注册路由-迭代
const registerRoute = (value, initalRoute, parentPath) =>
  value.reduce(
    (prev, { path, tabBar, getComponent, getChildRoutes, getIndexRoute }) => {
      if (tabBar) {
        // tabBar的路由，1级页面
        const tabBarPath = `/${path}/${getIndexRoute.path}`
        prev.tabBar[tabBarPath] = { screen: getIndexRoute.getComponent }
      } else {
        // 普通路由，1级以下的页面
        const routePath = `/${parentPath}/${path}`
        prev.route[routePath] = { screen: getComponent }
      }
      if (
        getChildRoutes &&
        Array.isArray(getChildRoutes) &&
        getChildRoutes.length != 0
      ) {
        // 将父组件的路由传递给子组件，仿url
        const nextPath = parentPath ? `${parentPath}/${path}` : path
        registerRoute(getChildRoutes, prev, nextPath)
      }
      return prev
    },
    initalRoute
  )
// 初始化路由
const initalRoute = {
  tabBar: {},
  route: {},
}
export default options => {
  let app, value

  app = create(options)
  // 注册model
  if (!global.registered) {
    const manifest = require('../src/manifest')
    value = Object.values(manifest).map(item => item(app, registerModel, registerRoute))
  }
  global.registered = true

  const TabNavigator = {}
  // 注册路由
  const _route = registerRoute(value, initalRoute)
  app.start()
  // 2.插件
  app.use(createLoading({ effects: true }))
  const store = app._store
  app.start = Router => () => <Provider store={store}>{<Router _route={_route} _registerRouteModel={app.model}/>}</Provider>
  app.getStore = () => store
  return app
}
