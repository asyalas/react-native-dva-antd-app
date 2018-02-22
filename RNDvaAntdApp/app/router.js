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
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import Login from './src/Login'

export const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.router
)
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
let AppNavigator

const addListener = createReduxBoundAddListener('root')

@connect(({ app, router }) => ({ app, router }))
export default class Router extends PureComponent {
  componentWillMount() {
    const { tabBar, route } = this.props._route
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

    const MainNavigator = StackNavigator(
      {
        HomeNavigator: { screen: HomeNavigator },
        ...route,
      },
      {
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
    // AppNavigator = MainNavigator
    AppNavigator = StackNavigator(
      {
        Login: { screen: Login },
        Main: { screen: MainNavigator },
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

    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
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
    // const { dispatch, app, router } = this.props
    // if (app.loading) return <Loading />
    // const navigation = addNavigationHelpers({
    //   dispatch,
    //   state: router,
    //   addListener,
    // })
    //
    return (
      <AppNavigator
      // navigation={navigation}
      />
    )
  }
}

// export function routerReducer(state, action = {}) {
//   return AppNavigator ? AppNavigator.router.getStateForAction(action, state) : null
// }
