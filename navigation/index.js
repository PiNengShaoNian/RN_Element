import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import Splash from '../screens/Splash'
import HomeTabs from './HomeTabs'
import Category from '../screens/Category'
import ShopInfo from '../screens/Shop'

const Stack = createStackNavigator()

export default RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
        // transitionSpec: {
        //   open: TransitionSpecs.TransitionIOSSpec,
        //   close: TransitionSpecs.TransitionIOSSpec
        // },
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      mode="card"
      headerMode="screen"
      initialRouteName="Splash"
    >
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={HomeTabs} name="Home" />
      <Stack.Screen component={Category} name="Category" />
      <Stack.Screen component={ShopInfo} name="ShopInfo" />
    </Stack.Navigator>
  )
}
