import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { StatusBar, Image, View, ActivityIndicator } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import Column from '../components/Column'
import DropdownMenu from '../components/DropdownMenu'
import NavigationBar from '../components/NavigationBar'
import Row from '../components/Row'
import Text from '../components/Text'
import Button from '../components/Button'
import Divider from '../components/Divider'
import ShopListItem from '../components/ShopListItem'
import { colors, images } from '../constants'
import { screenW, px2dp, wh } from '../utils/screen'

import {
  fetchFoodCategory,
  fetchFoodDelivery,
  fetchFoodActivity
} from '../api/food'
import { fetchShopList } from '../api/location'
import Loading from '../components/Loading'

const list = [
  '智能排序',
  '距离最近',
  '销量最高',
  '起送价最低',
  '配送速度最快',
  '评分最高'
]

const Category = ({ route, navigation }) => {
  const spinner = useRef()
  const [cateogry, setCategory] = useState([])
  const [delivery, setDelivery] = useState([])
  const [activity, setActivity] = useState([])
  const [shop, setShop] = useState([])
  const [cateogryChild, setCateogryChild] = useState([])

  const {
    params: { data, latitude, longitude }
  } = route

  const tabData = useMemo(() => {
    return [data.title, '排序', '筛选']
  }, [data])

  const onCategoryItemClick = useCallback(() => {
    setCateogryChild(item.sub_categories.slice())
  }, [])

  const onItemClick = useCallback(item => {
    spinner.current.updateCurrentLabel(item)
    spinner.current.hide()
  }, [])

  const onShopItemClick = useCallback(item => {
    navigation.navigate('ShopInfo', { id: item.id })
  })

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  useEffect(() => {
    fetchFoodCategory(latitude, longitude).then(res => {
      setCateogryChild(res[0].sub_categories)
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

      <NavigationBar title={data.title} onGoBackPress={onGoBackPress} />

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
            keyExtractor={(item, index) => index + ''}
            renderItem={CategoryItem}
            onPress={onCategoryItemClick}
          />

          <FlatList
            style={{ width: screenW / 2 }}
            data={cateogryChild}
            bounces={false}
            keyExtractor={(_, index) => index + ''}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={CategoryChild}
          />
        </Row>

        <FlatList
          style={{ width: screenW, backgroundColor: colors.white }}
          data={list}
          bounces={false}
          numColumns={3}
          keyExtractor={index => index + ''}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onItemClick(item, index)}
            >
              <Row
                verticalCenter
                style={{
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 10
                }}
              >
                <Text text={item} />
              </Row>
            </TouchableOpacity>
          )}
        />

        <Column style={{ width: screenW, backgroundColor: colors.white }}>
          <Text text="配送方式" style={{ margin: px2dp(10) }} />
          <FlatList
            data={delivery}
            bounces={false}
            numColumns={3}
            keyExtractor={(_, index) => index + ''}
            renderItem={({ item }) => (
              <Row verticalCenter style={{ width: screenW / 3 }}>
                <Text
                  microSize
                  text={item.icon_name}
                  style={{ color: item.icon_color }}
                />
                <Text microSize text={item.name} />
              </Row>
            )}
          />
          <Text text="商家属性（可以多选）" style={{ margin: px2dp(10) }} />
          <FlatList
            data={activity}
            bounces={false}
            numColumns={3}
            keyExtractor={(_, index) => index + ''}
            renderItem={({ item }) => (
              <Row
                verticalCenter
                style={{ width: screenW / 3, paddingHorizontal: 10 }}
              >
                <Text
                  microSize
                  text={item.icon_name}
                  style={{ color: item.icon_color, marginRight: 5 }}
                />
                <Text microSize text={item.name} />
              </Row>
            )}
          />

          <Row
            style={{ backgroundColor: colors.background, height: px2dp(80) }}
          >
            <Button
              onPress={() => null}
              title="清空"
              titleStyle={{ fontSize: px2dp(26), color: colors.black }}
              style={{
                flex: 1,
                height: px2dp(80),
                margin: px2dp(10),
                paddingHorizontal: 5,
                borderRadius: px2dp(10),
                backgroundColor: colors.white
              }}
            />
            <Button
              onPress={() => null}
              title="确定"
              titleStyle={{ fontSize: px2dp(26), color: colors.white }}
              style={{
                flex: 1,
                height: px2dp(80),
                margin: px2dp(10),
                paddingHorizontal: 5,
                borderRadius: px2dp(10),
                backgroundColor: colors.reseda
              }}
            />
          </Row>
        </Column>
      </DropdownMenu>

      <Loading visible={!shop.length}>
        <FlatList
          style={{ flex: 1 }}
          data={shop}
          keyExtractor={(_, index) => index + ''}
          renderItem={({ item }) => (
            <ShopListItem data={item} onPress={() => onShopItemClick(item)} />
          )}
        />
      </Loading>
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
            source={{ uri: 'http://cangdu.org:8001/img/' + item.image_url }}
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
            <Text text={item.count} style={{ paddingHorizontal: 6 }} />
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

const CategoryChild = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.name)}>
      <Row
        verticalCenter
        style={{ justifyContent: 'space-between', padding: px2dp(10) }}
      >
        <Text microSize text={item.name} />
        <Text microSize text={item.count} />
      </Row>
    </TouchableOpacity>
  )
}

export default Category
