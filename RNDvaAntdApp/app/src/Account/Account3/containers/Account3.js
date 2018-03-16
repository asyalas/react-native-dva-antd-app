import React from 'react'
import { connect } from 'react-redux'

import { Button } from '../../../../components'
import { StyleSheet, Text, View } from 'react-native'
import RN from 'react-native'

const _Button = RN.Button
@connect(({router}) => ({router}))
export default class Account3 extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params ? params.name : 'Account3的标题',
      headerRight: (
        <_Button onPress={params?params.changeCount:null} title="+1" color="#fff" />
      ),
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  componentDidMount() {
    this.props.navigation.setParams({ changeCount: this.changeCount })
  }
  goToAccount2 = () => {
    this.props.navigation.goBack()
  }
  changeCount = () => this.setState({ count: this.state.count + 1 })
  render() {
    return (
      <View>
        <Text>计数器{this.state.count}</Text>
        <Button onPress={() => this.goToAccount2()}>goBack</Button>
      </View>
    )
  }
}
