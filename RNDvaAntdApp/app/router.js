import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
  initializeListeners

} from 'react-navigation-redux-helpers'
import Login from './src/Login'
import { delay, } from './utils'
import { connect } from 'react-redux'

const actions = [...Object.values(NavigationActions).filter(item=>typeof(item)==='string')]


//react-navigation中间件
export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)
//获取当前的路由名
function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}
let AppNavigator, routerReducer

const addListener = createReduxBoundAddListener('root')

@connect(({ router }) => ({ router }))
export default class Router extends PureComponent {
  componentWillMount() {
    const { tabBar, route } = this.props._route;
    const { _registerRouteModel } = this.props;
    //配置tabBar
    const HomeNavigator = TabNavigator(tabBar, {
      initialRouteName: '/Account/Account1',
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      lazyLoad: true,
      backBehavior: 'initialRoute', // 按 back 键是否跳转到第一个 Tab，initailRoute - 返回初始界面,none - 退出
      animationEnabled: true,
      tabBarOptions: {},
    })
    //配置主要页面
    const MainNavigator = StackNavigator(
      {
        HomeNavigator: { screen: HomeNavigator },
        ...route,
      },
      {
        // initialRouteName : 'HomeNavigator',
        headerMode: 'float',
        navigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      }
    )
    //配置登陆页面
    AppNavigator = StackNavigator(
      {
        Login: { screen: Login },
        Main: { screen:MainNavigator  },
      },
      {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
          gesturesEnabled: false,
        },
        transitionConfig: () => ({
          transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps
            const { index } = scene

            const height = layout.initHeight
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, 0],
            })

            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index],
              outputRange: [0, 1, 1],
            })

            return { opacity, transform: [{ translateY }] }
          },
        }),
      }
    )
    //配置routerReducer
    const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'))
    routerReducer = (state = initialState, action = {}) => {
      const nextState = AppNavigator.router.getStateForAction(action, state);
      return nextState || state;
    }
    //配置router的Model
    const routerReducerModel = {
      namespace: 'router',
      state: {
        ...routerReducer(),
      },
      reducers: {
        apply(state, { payload: action }) {
          return routerReducer(state, action)
        },
      },
      effects: {
        watch: [
          function* watch({ take, call, put }) {
            while (true) {
              const payload = yield take(actions)
              yield put({
                type: 'apply',
                payload,
              })
              
              // debounce, see https://github.com/react-community/react-navigation/issues/271
              // if (payload.type === 'Navigation/NAVIGATE') {
              //   yield call(delay, 500)
              // }
            }
          },
          { type: 'watcher' },
        ],
      },
    }
    //注册router的reducer
    _registerRouteModel(routerReducerModel)
  }
  componentDidMount() {
    //监听安卓回退事件
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }
  componentWillUnmount() {
    //移除安卓回退事件
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    
    const { dispatch, router } = this.props
    if (!router) return <AppNavigator />
    const navigation = addNavigationHelpers({
      dispatch,
      state: router,
      addListener,
    })
    return (
      <AppNavigator
        navigation={navigation}
      />
    )
  }
}


