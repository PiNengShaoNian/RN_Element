import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  memo
} from 'react'
import {
  View,
  Animated,
  ImageBackground,
  findNodeHandle,
  Image,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native'
import { BlurView } from 'expo-blur'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import Column from '../../components/Column'
import Text from '../../components/Text'
import TabBar from '../../components/TabBar'
import { images } from '../../constants'
import { screenW, px2dp, wh } from '../../utils/screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fetchCityGuess } from '../../api/location'
import { fetchShopDetails } from '../../api/shop'

const ShopInfo = ({ navigation, route }) => {
  const [bgY, setBgY] = useState(0)
  const [bgScale, setBgScale] = useState(1)
  const [headOpacity, setHeadOpacity] = useState(1)
  const [shopImg, setShopImg] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopPromotion, setShopPromotion] = useState('')
  const backgroundImage = useRef()
  const viewRef = useRef()

  const onImageLoaded = useCallback(() => {
    viewRef.current = findNodeHandle(backgroundImage.current)
  })

  const shopId = useMemo(() => {
    return route.params.id
  }, [route])

  useEffect(() => {
    fetchCityGuess()
      .then(({ latitude, longitude }) => {
        return fetchShopDetails(shopId, latitude, longitude)
      })
      .then(res => {
        setShopImg(res.image_path)
        setShopName(res.name)
        setShopPromotion(res.promotion_info)
      })
  }, [shopId])

  return (
    <Column style={{ flex: 1 }}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: bgY
            },
            {
              scale: bgScale
            }
          ]
        }}
      >
        <ImageBackground
          source={images.Common.shopBg}
          style={styles.bg}
          ref={backgroundImage}
          onLoadEnd={onImageLoaded}
        />
        <BlurView tint="light" intensity={25} style={styles.blur} />
      </Animated.View>

      <View style={styles.head}>
        <TouchableOpacity
          style={{ width: px2dp(70) }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={images.Common.goBack}
            style={{ ...wh(20, 30), margin: px2dp(25) }}
          />
        </TouchableOpacity>
        <Animated.View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            opacity: headOpacity
          }}
        >
          <Image
            source={{ uri: 'http://cangdu.org:8001/img/' + shopImg }}
            style={styles.logo}
          />
          <Column style={{ marginLeft: 14, flex: 1 }}>
            <Column>
              <Text white text={shopName} />
              <Row verticalCenter>
                <View
                  style={{
                    paddingVertical: px2dp(2),
                    paddingHorizontal: px2dp(4),
                    marginVertical: px2dp(4)
                  }}
                >
                  <Text white text="蜂鸟专送" />
                </View>
                <Text white microSize text="30分钟送达"></Text>
              </Row>
            </Column>
            <Text white microSize numberOfLines={1} text={shopPromotion} />
          </Column>
        </Animated.View>
        <Activities />
      </View>
      <ScrollableTabView renderTabBar={() => <TabBar />}>
        <ShopInfoList shopId={shopId} tabLabel="商品" navigation={navigation} />
      </ScrollableTabView>
    </Column>
  )
}

const Activities = memo(() => {
  return (
    <Column style={{ margin: px2dp(30) }}>
      <Row verticalCenter>
        <View
          style={{
            padding: px2dp(2),
            marginRight: px2dp(5),
            backgroundColor: '#f07373'
          }}
        >
          <Text white microSize text="减" />
        </View>
        <Text
          white
          microSize
          text="满20减2，满30减3，满40减4（不与美食活动同享）"
        />
      </Row>
      <Row verticalCenter style={{ marginTop: px2dp(10) }}>
        <View
          style={{
            padding: px2dp(2),
            marginRight: px2dp(5),
            backgroundColor: '#f07373'
          }}
        >
          <Text white microSize text="特" />
        </View>
        <Text white microSize text="双人餐特惠" />
      </Row>
    </Column>
  )
})

export default ShopInfo

const styles = StyleSheet.create({
  bg: {
    width: screenW,
    height: screenW / 2,
    resizeMode: 'stretch'
  },
  blur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: screenW,
    height: screenW / 2
  },
  head: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  logo: {
    ...wh(100),
    resizeMode: 'cover'
  }
})
