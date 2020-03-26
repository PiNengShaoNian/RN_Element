import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'

// https://github.com/magicismight/react-native-root-toast/issues/108
import 'react-native-root-siblings'

import RootStack from './navigation'
import store from './store'

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </NavigationContainer>
  )
}
