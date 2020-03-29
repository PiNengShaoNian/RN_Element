import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack'

import Splash from '../screens/Splash'
import PayOnline from '../screens/PayOnline'
import HomeTabs from './HomeTabs'
import Category from '../screens/Category'
import ShopInfo from '../screens/Shop'
import OrderConfirm from '../screens/Shop/OrderConfirm'
import Login from '../screens/Auth/Login'
import Address from '../screens/Address'
import AddAddress from '../screens/Address/AddAddress'
import SearchAddress from '../screens/Address/SearchAddress'
import UserInfo from '../screens/Home/UserInfo'
import ModifyUsername from '../screens/Home/ModifyUsername'
import ModifyPwd from '../screens/Home/ModifyPwd'

const Stack = createStackNavigator()

export default RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
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
      <Stack.Screen component={OrderConfirm} name="OrderConfirm" />
      <Stack.Screen component={PayOnline} name="PayOnline" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Address} name="Address" />
      <Stack.Screen component={AddAddress} name="AddAddress" />
      <Stack.Screen component={SearchAddress} name="SearchAddress" />
      <Stack.Screen component={UserInfo} name="UserInfo" />
      <Stack.Screen component={ModifyUsername} name="ModifyUsername" />
      <Stack.Screen component={ModifyPwd} name="ModifyPwd" />
    </Stack.Navigator>
  )
}
