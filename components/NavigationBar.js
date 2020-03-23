import React, { useMemo, memo } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  StatusBar
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { colors } from '../constants'
import { px2dp } from '../utils/screen'
import Visible from './Visible'
import { images } from '../constants'
import { wh } from '../utils/screen'

const GoBack = memo(({ onPress, goBackColor }) => (
  <TouchableOpacity
    onPress={() => {
      onPress && onPress()
    }}
  >
    <View style={{ paddingVertical: px2dp(26), paddingHorizontal: px2dp(30) }}>
      <Image
        style={{
          ...wh(20, 30),
          tintColor: goBackColor,
          justifyContent: 'center',
          alignItems: 'center',
          resizeMode: 'stretch'
        }}
        source={images.Common.goBack}
      />
    </View>
  </TouchableOpacity>
))

export default NavigationBar = ({
  dividerVisible = false,
  navBarImage,
  title,
  goBackColor = null,
  goBackVisible = true,
  titleColor = colors.white,
  leftItem,
  rightItem = null,
  onGoBackPress
}) => {
  const divider = dividerVisible
    ? {
        borderBottomWidth: px2dp(1),
        borderBottomColor: colors.divider
      }
    : null

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          ...divider
        }}
      >
        <Visible visible={navBarImage}>
          <Image style={styles.bgImg} source={navBarImage} />
        </Visible>
        <Visible visible={!navBarImage}>
          <View style={styles.bgView} />
        </Visible>

        <View style={styles.content}>
          {typeof title === 'string' ? (
            <Text
              style={{
                fontSize: px2dp(32),
                backgroundColor: 'transparent',
                color: titleColor
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )}

          {goBackVisible ? (
            <View style={{ position: 'absolute', left: 0 }}>
              {leftItem || (
                <GoBack onPress={onGoBackPress} goBackColor={goBackColor} />
              )}
            </View>
          ) : null}

          <View style={{ position: 'absolute', right: 0 }}>{rightItem}</View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const NAVIGATION_BAR_HEIGHT = px2dp(Platform.OS === 'ios' ? 100 : 144)
const ANDROID_STATUSBAR = px2dp(StatusBar.currentHeight * 2)
const IOS_STATUSBAR = px2dp(0)

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.theme
  },
  bgImg: {
    resizeMode: 'stretch',
    width: '100%',
    height: NAVIGATION_BAR_HEIGHT
  },
  bgView: {
    width: '100%',
    height: NAVIGATION_BAR_HEIGHT,
    backgroundColor: colors.theme
  },
  content: {
    width: '100%',
    height:
      Platform.OS === 'ios'
        ? NAVIGATION_BAR_HEIGHT - IOS_STATUSBAR
        : NAVIGATION_BAR_HEIGHT - ANDROID_STATUSBAR,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? IOS_STATUSBAR : ANDROID_STATUSBAR
  }
})
