import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import Find from '../screens/Home/Find'
import Order from '../screens/Home/Order'
import User from '../screens/Home/User'
import TabBarItem from '../components/TabBarItem'
import { images, colors } from '../constants'
import { px2dp } from '../utils/screen'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Tabs = createBottomTabNavigator()

export default HomeTabs = () => {
  return (
    <Tabs.Navigator
      lazy={true}
      tabBarOptions={{
        style: {
          height: px2dp(70),
          padding: 0,
          margin: 0,
          backgroundColor: '#fff'
        },
        tabStyle: {
          margin: 0,
          marginTop: 5,
          padding: 0,
          height: px2dp(70)
        },
        labelStyle: {
          fontSize: 12
        },
        activeTintColor: colors.theme,
        inactiveTintColor: '#979797'
      }}
      screenOptions={({ route, navigation }) => {
        const map = {
          Find: {
            n: images.Main.findTabNormal,
            s: images.Main.findTabClick,
            l: '发现',
            size: 50
          },
          Home: {
            n: images.Main.homeTabNormal,
            s: images.Main.homeTabClick,
            l: '外卖',
            size: 70
          },
          Order: {
            n: images.Main.orderTabNormal,
            s: images.Main.orderTabClick,
            l: '订单',
            size: 42
          },
          User: {
            n: images.Main.myTabNormal,
            s: images.Main.myTabClick,
            l: '我的',
            size: 42
          }
        }
        const tab = map[route.name]
        return {
          tabBarIcon: ({ focused }) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate(route.name)}>
                <TabBarItem
                  focused={focused}
                  size={tab.size}
                  normalImage={tab.n}
                  selectedImage={tab.s}
                />
              </TouchableOpacity>
            )
          },
          tabBarLabel: tab.l
        }
      }}
    >
      <Tabs.Screen component={Home} name="Home" />
      <Tabs.Screen component={Find} name="Find" />
      <Tabs.Screen component={Order} name="Order" />
      <Tabs.Screen component={User} name="User" />
    </Tabs.Navigator>
  )
}
