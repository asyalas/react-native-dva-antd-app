import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, Text, Image } from 'react-native'
@connect(state => ({}))
export default class Home1 extends React.Component {
  static navigationOptions = {
    title: 'Home1',
    tabBarLabel: 'Home1',
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
  componentDidMount() {}

  render() {
    return <Text>Home1</Text>
  }
}
