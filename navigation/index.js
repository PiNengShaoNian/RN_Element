import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Splash from '../screens/Splash'
import HomeTabs from './HomeTabs'

const Stack = createStackNavigator()

export default RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Splash"
    >
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={HomeTabs} name="Home" />
    </Stack.Navigator>
  )
}
