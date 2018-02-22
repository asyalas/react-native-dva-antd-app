import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { Button } from '../components'

import { NavigationActions } from '../utils'

import { NoticeBar, SearchBar, Toast, SegmentedControl } from 'antd-mobile'

@connect()
class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }
  state = {
    value: '',
  }

  onScrollChange = value => {
    console.log(value)
  }

  handleClick = () => {
    this.manualFocusInst.focus()
  }

  clear = () => {
    this.setState({ value: '' })
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'Account' }))
  }
  failToast = () => {
    Toast.fail('Load failed !!!', 1)
  }
  onChange = e => {
    this.setState({ value: e })
  }
  render() {
    return (
      <View style={styles.container}>
        <Button text="Goto Detail" onPress={this.gotoDetail} />
        <Button text="Go Back" onPress={this.goBack} />
        <Button onPress={this.failToast}>fail</Button>
        <View style={styles.container}>
          <SearchBar
            value={this.state.value}
            placeholder="Search"
            onSubmit={value => console.log(value, 'onSubmit')}
            onClear={value => this.clear(value, 'onClear')}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={() => this.clear('onCancel')}
            showCancelButton
            onChange={this.onChange}
          />
          <SegmentedControl
            values={['Segment1', 'Segment2', 'Segment3']}
            tintColor="#ff0000"
            style={{ height: 40, width: 250 }}
          />
          <NoticeBar marqueeProps={{ loop: true, style: { padding: 10 } }}>
            Notice: The arrival time of incomes and transfers of Yu &#39;E Bao
            will be delayed during National Day.
          </NoticeBar>
          <Button>Start</Button>
        </View>
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
})

export default Detail
