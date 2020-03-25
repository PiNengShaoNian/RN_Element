import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Animated, View, Easing } from 'react-native'
import { colors } from '../constants'
import { px2dp, wh } from '../utils/screen'

const AnimatedCart = memo(
  forwardRef(({}, ref) => {
    const [hide, setHide] = useState(true)
    const translate = useRef(new Animated.ValueXY(0, 0))

    useImperativeHandle(
      ref,
      () => ({
        startAnim(startPosition, endPosition, callback) {
          setHide(false)
          translate.current.setValue(startPosition)
          Animated.timing(translate.current, {
            toValue: endPosition,
            duration: 350,
            easing: Easing.linear
          }).start(() => {
            callback()
            setHide(true)
          })
        }
      }),
      []
    )

    return !hide ? (
      <Animated.View
        style={{
          position: 'absolute',
          transform: [
            {
              translateY: translate.current.y
            },
            {
              translateX: translate.current.x
            }
          ]
        }}
      >
        <View
          style={{
            ...wh(40),
            borderRadius: px2dp(20),
            backgroundColor: colors.theme
          }}
        />
      </Animated.View>
    ) : null
  })
)

export default AnimatedCart
