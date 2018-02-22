import React from 'react'
import { AppRegistry } from 'react-native'
import { Toast } from 'antd-mobile'
import dva from './utils/dva'
import Router, { routerMiddleware } from './router'

import appModel from './models/app'
import routerModel from './models/router'

const app = dva({
  initialState: {},
  models: [appModel, routerModel],
  onAction: [routerMiddleware],
  // effect 执行错误或 subscription 通过 done 主动抛错时触发，可用于管理全局出错状态
  onError(e) {
    Toast.fail(e.msg)
    if (process.env.NODE_ENV !== 'production') console.error(error)
  },
})

const App = app.start(Router)
debugger
AppRegistry.registerComponent('RNDvaAntdApp', () => App)
