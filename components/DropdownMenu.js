import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect
} from 'react'
import PropTypes from 'prop-types'
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  Easing,
  Animated,
  Modal,
  Button,
  TouchableWithoutFeedback
} from 'react-native'
import {
  TouchableOpacity
  // TouchableWithoutFeedback
} from 'react-native-gesture-handler'

const width = Dimensions.get('window').width

const measureView = view => {
  return new Promise(resolve => {
    view.measure((x, y, width, height, px, py) =>
      resolve({ x, y, width, height, px, py })
    )
  })
}

const TabItem = memo(
  ({
    data,
    index,
    length,
    onPress,
    tabLabelSize,
    color,
    arrowImg,
    rotationAnims
  }) => {
    return (
      <TouchableOpacity
        style={[styles.tabItemStyle, { width: width / length }]}
        activeOpacity={1}
        onPress={() => onPress(index)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[styles.tabTextStyle, { fontSize: tabLabelSize, color }]}
          >
            {data}
          </Text>
          <Animated.Image
            source={arrowImg}
            style={{
              marginLeft: 4,
              tintColor: color,
              transform: [
                {
                  rotateZ: rotationAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }
              ]
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }
)

const DropdownMenu = memo(
  forwardRef(
    (
      {
        tabData,
        tabSelectColor,
        tabUnSelectColor,
        arrowImg,
        children,
        contentHeight
      },
      ref
    ) => {
      const tab = useRef()
      const [activeIndex, setActiveIndex] = useState()
      const [tabTop, setTabTop] = useState(0)
      const [contentVisible, setContentVisible] = useState(false)
      const [contentAnimated] = useState(new Animated.Value(0))
      const [opacityAnimated] = useState(new Animated.Value(0))

      const computeColor = useCallback(
        index => {
          return activeIndex === index ? tabSelectColor : tabUnSelectColor
        },
        [activeIndex, tabSelectColor, tabUnSelectColor]
      )

      const show = useCallback(() => {
        setContentVisible(true)
      }, [])

      const onTabItemClick = useCallback(
        async index => {
          if (tabTop === 0) {
            const location = await measureView(tab.current)
            const nextTabTop =
              location.py +
              location.height -
              (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight)

            setTabTop(nextTabTop)

            if (contentVisible) {
              hide()
            } else {
              setActiveIndex(index)
              show()
            }
          }
        },
        [hide]
      )

      const createAnimation = useCallback(
        height => {
          return Animated.timing(contentAnimated, {
            toValue: height,
            duration: 200
          })
        },
        [contentAnimated]
      )

      const createFade = useCallback(
        value => {
          return Animated.timing(opacityAnimated, {
            toValue: value,
            duration: 200
          })
        },
        [opacityAnimated]
      )

      const createArrowAnimation = useCallback(
        value => {
          return Animated.timing(() => {
            rotationAnims[activeIndex],
              {
                toValue: value,
                duration: 300,
                easing: Easing.linear
              }
          })
        },
        [rotationAnims]
      )

      const hide = useCallback(() => {
        Animated.parallel([createAnimation(0), createFade(0)]).start(() => {
          setActiveIndex(-1)
          contentAnimated.setValue(0)
          setContentVisible(false)
        })

        if (activeIndex !== -1) createArrowAnimation(0)
      }, [activeIndex, createAnimation, createFade, contentAnimated])

      const rotationAnims = useMemo(() => {
        return Array.from(
          { length: tabData.length },
          () => new Animated.Value(0)
        )
      }, [tabData])

      useImperativeHandle(
        ref,
        () => ({
          hide
        }),
        [hide]
      )
      useEffect(() => {
        if (contentVisible) {
          Animated.parallel([
            createAnimation(contentHeight),
            createFade(1)
          ]).start()
          createArrowAnimation(0.5)
        }
      }, [
        contentVisible,
        contentHeight,
        createAnimation,
        createFade,
        createArrowAnimation
      ])

      return (
        <View>
          <View ref={tab} style={styles.tabStyle}>
            {tabData.map((item, index) => (
              <TabItem
                key={index}
                data={item}
                color={computeColor(index)}
                length={tabData.length}
                index={index}
                arrowImg={arrowImg}
                rotationAnims={rotationAnims}
                onPress={onTabItemClick}
              />
            ))}
          </View>
          <Modal
            animationType="none"
            visible={contentVisible}
            transparent={true}
            onRequestClose={hide}
          >
            <TouchableWithoutFeedback onPress={hide}>
              {/* <View style={{ backgroundColor: 'purple', height: 300 }} /> */}
              <View style={styles.modal}>
                <Animated.View
                  style={[styles.bg, { top: tabTop, opacity: opacityAnimated }]}
                />
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: tabTop,
                    height: contentAnimated
                  }}
                >
                  {children && children[activeIndex]}
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      )
    }
  )
)

DropdownMenu.propTypes = {
  tabSelectColor: PropTypes.string,
  tabUnSelectColor: PropTypes.string,
  tabData: PropTypes.array,
  tabLabelSize: PropTypes.number,
  contentHeight: PropTypes.number,
  arrowImg: PropTypes.number
}

DropdownMenu.defaultProps = {
  tabSelectColor: 'blue',
  tabUnSelectColor: 'black',
  tabData: [],
  tabLabelSize: 14,
  contentHeight: 200,
  arrowImg: require('../assets/images/dropdown_arrow.png')
}

export default DropdownMenu

const styles = StyleSheet.create({
  tabStyle: {
    width,
    flexDirection: 'row',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  tabItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  tabTextStyle: {
    marginRight: 5
  },
  modal: {
    flex: 1
  },
  bg: {
    flex: 1,
    backgroundColor: 'rgba(50, 50, 50, 0.2)'
  }
})
