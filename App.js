import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'

import RootStack from './navigation'

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
      {/* <View style={styles.container}>
        <Text>Open up App.js to start workisdfsdng on your app!</Text>
      </View> */}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
