import React, { useRef, useMemo, useState, useEffect } from 'react'
import { StatusBar, Image, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import Column from '../components/Column'
import DropdownMenu from '../components/DropdownMenu'
import NavigationBar from '../components/NavigationBar'
import Row from '../components/Row'
import Text from '../components/Text'
import { colors, images } from '../constants'
import { screenW, px2dp, wh } from '../utils/screen'

import {
  fetchFoodCategory,
  fetchFoodDelivery,
  fetchFoodActivity
} from '../api/food'
import { fetchShopList } from '../api/location'

const Category = ({ route }) => {
  const spinner = useRef()
  const [cateogry, setCategory] = useState([])
  const [delivery, setDelivery] = useState([])
  const [activity, setActivity] = useState([])
  const [shop, setShop] = useState([])

  const {
    params: { data, latitude, longitude }
  } = route

  const tabData = useMemo(() => {
    return [data.title, '排序', '筛选']
  }, [data])

  useEffect(() => {
    fetchFoodCategory(latitude, longitude).then(res => {
      setCategory(res)
    })

    fetchFoodDelivery(latitude, longitude).then(res => {
      setDelivery(res)
    })

    fetchFoodActivity(latitude, longitude).then(res => {
      setActivity(res)
    })

    fetchShopList(latitude, longitude).then(res => {
      setShop(res)
    })
  }, [])

  return (
    <Column style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor="transparent"
        translucent
        androidtranslucent
        barStyle="light-content"
      />

      <NavigationBar title={data.title} />

      <DropdownMenu
        ref={spinner}
        tabSelectColor={colors.theme}
        tabData={tabData}
      >
        <Row style={{ width: screenW, backgroundColor: colors.white }}>
          <FlatList
            style={{ width: screenW / 2 }}
            data={cateogry}
            bounces={false}
            renderItem={CategoryItem}
          />
        </Row>
      </DropdownMenu>
    </Column>
  )
}

const CategoryItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Row
        verticalCenter
        style={{ marginVertical: px2dp(10), justifyContent: 'space-between' }}
      >
        <Row verticalCenter>
          <Image
            source={{ uri: 'http://cangdu.org:8001/img/' + item }}
            style={{ ...wh(20), marginLeft: px2dp(5) }}
          />
          <Text text={item.name} />
        </Row>
        <Row verticalCenter>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.gray2,
              borderRadius: px2dp(14)
            }}
          >
            <Text text={item.count} />
          </View>
          <Image
            source={images.Common.arrowRight}
            style={{ ...wh(20), marginHorizontal: px2dp(5) }}
          />
        </Row>
      </Row>
    </TouchableOpacity>
  )
}

export default Category
