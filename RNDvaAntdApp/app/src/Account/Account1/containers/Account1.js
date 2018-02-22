import React from 'react'
import { connect } from 'react-redux'

import { Button } from '../../../../components'
import { StyleSheet, Image, Text } from 'react-native'
@connect(state => ({}))
export default class Account1 extends React.Component {
  static navigationOptions = {
    title: 'Account1的标题',
    tabBarLabel: 'Account1',
    tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={[
            { tintColor: focused ? tintColor : 'gray', width: 32, height: 32 },
          ]}
          source={require('../../../../images/house.png')}
        />
      ),
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // this.props.dispatch({type:'Account1/getAccount'})
  }
  goToAccount2 = () => {
    const { navigation } = this.props
    navigation.navigate('/Account/Account2', {
      state: '我是来自Account1的数据',
    })
  }
  render() {
    return <Button onPress={() => this.goToAccount2()}>goToAccount2</Button>
  }
}
