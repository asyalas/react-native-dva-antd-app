import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const Loading = () => (
  <View style={styles.container}>
    {/* <ActivityIndicator /> */}

    <Text>3333</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
