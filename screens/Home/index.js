import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  Platform
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native-gesture-handler'

import { colors, images } from '../../constants'
import Visible from '../../components/Visible'
import Row from '../../components/Row'
import Text from '../../components/Text'
import Divider from '../../components/Divider'
import RefreshListView from '../../components/RefreshListView'
import Column from '../../components/Column'
import ShopListItem from '../../components/ShopListItem'
import { px2dp, wh, screenW } from '../../utils/screen'
import * as actions from '../../action/home'

const navHeight = Platform.OS === 'ios' ? 210 : 240
const top = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight
const cdn = 'https://fuss10.elemecdn.com'

const NavBar = ({ navigation, cityName }) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.theme }}>
      <View
        style={{
          height: px2dp(navHeight),
          backgroundColor: colors.theme,
          paddingTop: px2dp(30) + top
        }}
      >
        <Row
          verticalCenter
          style={{
            justifyContent: 'space-between',
            marginHorizontal: px2dp(20)
          }}
        >
          <Row verticalCenter>
            <Image source={images.Main.location} style={{ ...wh(30) }} />
            <Text white text={cityName} />
            <Image source={images.Main.arrow} style={{ ...wh(18, 25) }} />
          </Row>
          <Row verticalCenter>
            <View style={{ marginRight: 5 }}>
              <Text microSize white style={{ textAlign: 'center' }} text="3°" />
              <Text
                microSize
                white
                style={{ textAlign: 'center' }}
                text="多云"
              />
            </View>
            <Image source={images.Main.weather} style={{ ...wh(25) }} />
          </Row>
        </Row>

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Find')
          }}
        >
          <View style={[styles.searchBtn, { backgroundColor: '#fff' }]}>
            <Image source={images.Main.search} style={{ ...wh(30) }} />
            <Text gray style={{ marginLeft: 5 }} text="输入商家，商品名称" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  )
}

const Category = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(item)}
      style={{
        width: screenW / 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: px2dp(20)
      }}
    >
      <Image source={{ uri: cdn + item.image_url }} style={{ ...wh(80) }} />
      <Text mediumSize text={item.title} />
    </TouchableOpacity>
  )
}

const CategoriesIndicator = ({ length, pageIndex }) => {
  return Array.from({ length }, (_, i) => {
    return (
      <View
        key={i}
        style={[
          styles.bannerDotStyle,
          i === pageIndex
            ? { backgroundColor: colors.theme }
            : { backgroundColor: colors.gray3 }
        ]}
      />
    )
  })
}

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const {
    refreshState,
    noMoreData,
    latitude,
    longitude,
    categoryList,
    shopList,
    name: cityName
  } = useSelector(({ home }) => home)
  const [netError, setNetError] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    dispatch(actions.getHomeData())
  }, [])

  const getData = useCallback(() => {
    dispatch(actions.getHomeData())
  }, [dispatch])

  const onFooterRefresh = useCallback(() => {
    if (noMoreData) return

    dispatch(actions.loadMoreShopList(latitude, longitude))
  }, [dispatch, latitude, longitude])

  const onCategoryItemClick = useCallback(
    category => {
      navigation.navigate('Category', {
        data: category,
        latitude,
        longitude
      })
    },
    [latitude, longitude]
  )

  const onAnimationEnd = useCallback(e => {
    const offsetX = e.nativeEvent.contentOffset.x
    const pageIndex = Math.floor(offsetX / screenW)
    setPageIndex(pageIndex)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor="transparent"
        translucent
        androidtranslucent
        barStyle="light-content"
      />

      <Visible visible={!netError}>
        <View style={{ flex: 1 }}>
          <NavBar navigation={navigation} cityName={cityName} />

          <RefreshListView
            data={shopList}
            refreshState={refreshState}
            onHeaderRefresh={getData}
            onFooterRefresh={onFooterRefresh}
            keyExtractor={(item, index) => index + item.name}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <ShopListItem
                data={item}
                onPress={() => {
                  navigation.navigate('ShopInfo', { id: item.id })
                }}
              />
            )}
            ListHeaderComponent={() => {
              const length = categoryList.length
              if (length === 0) return null

              return (
                <Column style={{ backgroundColor: colors.white }}>
                  <ScrollView
                    contentContainerStyle={{ width: screenW * length }}
                    bounces={false}
                    pagingEnabled={true}
                    horizontal={true}
                    onMomentumScrollEnd={onAnimationEnd}
                    showsHorizontalScrollIndicator={false}
                  >
                    {categoryList.map((data, index) => (
                      <View key={index} style={styles.typesView}>
                        {data.map((item, i) => (
                          <Category
                            key={i}
                            item={item}
                            onPress={onCategoryItemClick}
                          />
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                  <Row horizontalCenter>
                    <CategoriesIndicator
                      length={length}
                      pageIndex={pageIndex}
                    />
                  </Row>
                  <Divider
                    style={{
                      height: px2dp(20),
                      backgroundColor: colors.background
                    }}
                  />
                  <Text text="附近商家" style={{ margin: px2dp(20) }}></Text>
                </Column>
              )
            }}
          />
        </View>
      </Visible>
    </View>
  )
}

Home.navigationOptions = {
  header: null
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  searchBtn: {
    margin: px2dp(20),
    borderRadius: px2dp(30),
    height: px2dp(60),
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerDotStyle: {
    ...wh(16),
    borderRadius: px2dp(8),
    marginHorizontal: px2dp(6),
    marginBottom: px2dp(15)
  },
  typesView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
