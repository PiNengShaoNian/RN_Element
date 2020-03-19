import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home'
import TabBarItem from '../components/TabBarItem'
import { images, colors } from '../constants'
import { px2dp } from '../utils/screen'

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
      screenOptions={() => ({
        tabBarLabel: '外卖',
        tabBarIcon: ({ focused }) => {
          return (
            <TabBarItem
              focused={focused}
              size={70}
              normalImage={images.Main.homeTabNormal}
              selectedImage={images.Main.homeTabClick}
            />
          )
        }
      })}
    >
      <Tabs.Screen component={Home} name="Home"></Tabs.Screen>
    </Tabs.Navigator>
  )
}
