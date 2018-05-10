import React from 'react'

import { Button } from '../../../../components'
import { StyleSheet, Image, Text, WebView, View } from 'react-native'
import { connect } from 'react-redux'
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
        super(props);
        this.state = {
            data:1
        }
    }

    sendMessage() {
      this.setState({data : this.state.data*2},()=>{
        this.refs.webview.postMessage(this.state.data);
      })
        
    }

    handleMessage(e) {
        this.setState({ data: e.nativeEvent.data });
    }
    componentDidMount() {
    }
    goToAccount2 = () => {
        const { navigation } = this.props
        navigation.navigate('/Account/Account2', {
            state: '我是来自Account1的数据',
        })
    }
    render() {
        return <View style={{ flex: 1 }}>
            <Button onPress={() => this.goToAccount2()}>goToAccount2</Button>
            <View style={{ marginTop: 12, flex: 1 }}>
                <WebView
                    ref={'webview'}
                    source={require('../components/index.html')}
                    style={{ flex:1 }}
                    onMessage={(e) => {
                        this.handleMessage(e)
                    }}
                    scalesPageToFit={false}

                />

            </View>

            <Button>来自webview的数据 : {this.state.data}</Button>
            <Button onPress={() => this.sendMessage()}>发送数据到WebView,数值*2</Button>
           

        </View>
    }
}
