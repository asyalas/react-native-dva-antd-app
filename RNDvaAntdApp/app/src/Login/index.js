import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { Button, Touchable } from '../../components'

import { createAction, NavigationActions } from '../../utils'

@connect()
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.navigation.navigate('Main')
  }


  render() {
    const { fetching } = this.props

    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <Button text="Login" onPress={this.onLogin} />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})

export default Login
