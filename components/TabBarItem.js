import React from 'react'
import { StyleSheet, Image, View } from 'react-native'

import { px2dp } from '../utils/screen'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default TabBarItem = ({
  selectedImage,
  normalImage,
  focused,
  tintColor,
  size
}) => {
  selectedImage = selectedImage ? selectedImage : normalImage

  return (
    <View style={styles.container}>
      <Image
        source={focused ? selectedImage : normalImage}
        style={{
          tintColor: tintColor,
          width: px2dp(size),
          height: px2dp(size)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(90),
    width: px2dp(120)
  }
})
