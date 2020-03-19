import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'

import { images } from '../constants'

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      // const isInit = await Storage.get('isInit')
      navigation.replace('Home')
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <View>
      <Image
        source={images.Splash.splash}
        style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
      />
    </View>
  )
}

export default Splash
