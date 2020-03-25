import React, {
  memo,
  useImperativeHandle,
  forwardRef,
  useRef,
  useState
} from 'react'
import { View, StyleSheet, Animated, Image, Easing } from 'react-native'
import { screenW, px2dp, wh } from '../utils/screen'

import Row from './Row'
import Column from './Column'
import Text from './Text'
import { colors, images } from '../constants'
import Button from './Button'

const ShopBar = memo(
  forwardRef(({ totalPrice, navigation, totalCount }, ref) => {
    const cartElement = useRef()
    const [scale] = useState(new Animated.Value(0))

    useImperativeHandle(
      ref,
      () => {
        return {
          cartElement: cartElement.current,
          runAnimate() {
            scale.setValue(0)
            Animated.timing(scale, {
              toValue: 2,
              duration: 320,
              easing: Easing.elastic(3)
            }).start()
          }
        }
      },
      []
    )

    return (
      <View style={styles.cartView}>
        <Row
          verticalCenter
          horizontalCenter
          style={{
            height: px2dp(40),
            borderTopColor: '#eec990',
            borderTopWidth: px2dp(1),
            backgroundColor: '#eee9bf'
          }}
        >
          <Text microSize text="满20减12" />
          <Text microSize text="满35减17" />
          <Text microSize text="满50减55" />
        </Row>
        <Row
          verticalCenter
          style={{
            height: px2dp(90),
            justifyContent: 'space-between',
            backgroundColor: colors.gray3
          }}
        >
          <Column
            style={{
              height: px2dp(90),
              marginLeft: px2dp(160),
              justifyContent: 'center'
            }}
          >
            <Text white text={`￥${totalPrice}`} />
            <Text white text={`配送费￥3`} style={{ fontSize: px2dp(18) }} />
          </Column>

          <Button
            style={{
              ...wh(160, 90),
              backgroundColor: totalPrice >= 20 ? colors.reseda : 'transparent'
            }}
            activeOpacity={totalPrice > 0 ? 0.8 : 1}
            onPress={() => navigation.navigate('OrderConfirm')}
            title="￥20起送"
          />
        </Row>

        <Animated.View
          style={[
            styles.iconWrap,
            {
              transform: [
                {
                  scale: scale.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [1, 0.8, 1]
                  })
                }
              ]
            }
          ]}
        >
          <View
            style={[
              styles.iconView,
              totalCount > 0 ? { backgroundColor: colors.theme } : null
            ]}
          >
            <Image
              source={images.Shop.cart}
              ref={cartElement}
              style={{
                ...wh(50),
                tintColor: totalPrice > 0 ? colors.white : colors.gray3
              }}
            />
          </View>
          {totalCount > 0 ? (
            <View style={styles.count}>
              <Text white text={totalCount} style={{ fontSize: px2dp(18) }} />
            </View>
          ) : null}
        </Animated.View>
      </View>
    )
  })
)

export default ShopBar

const styles = StyleSheet.create({
  cartView: {
    width: screenW,
    height: px2dp(130)
  },
  count: {
    ...wh(30),
    backgroundColor: '#f00',
    borderRadius: px2dp(20),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: px2dp(2),
    right: px2dp(2)
  },
  iconWrap: {
    position: 'absolute',
    left: px2dp(30),
    top: px2dp(10),
    ...wh(100)
  },
  iconView: {
    backgroundColor: '#333',
    overflow: 'hidden',
    borderRadius: px2dp(47),
    ...wh(94),
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
