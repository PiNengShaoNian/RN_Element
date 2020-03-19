import { BackHandler } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { useEffect, useCallback, useRef, useContext } from 'react'

import Toast from '../components/Toast'

export const useDoubleBack = () => {
  const navigation = useContext(NavigationContext)
  const onBackPress = useCallback(() => {
    if (pressedBackAt.current && pressedBackAt.current + 2000 >= Date.now())
      return false

    pressedBackAt = Date.now()
    Toast.show('再按一次退出应用', { position: -50 })
  }, [])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  }, [])
}
