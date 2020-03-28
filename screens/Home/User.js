import React, { memo, useCallback, useState } from 'react'
import { View, StatusBar, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import NavigationBar from '../../components/NavigationBar'
import { colors, images } from '../../constants'
import Column from '../../components/Column'
import Text from '../../components/Text'
import { wh, px2dp } from '../../utils/screen'

const User = memo(({ navigation }) => {
  const [avatar, setAvatar] = useState('')
  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState(0)
  const [gift_amount, setGiftAmount] = useState(0)
  const [point, setPoint] = useState(0)

  const handleLogoutSuccess = useCallback(() => {
    setAvatar('')
    setUsername('')
    setBalance(0)
    setGiftAmount(0)
    setPoint(0)
  }, [])

  const handleLoginSucess = useCallback(() => {
    const { avatar, username, balance, gift_amount, point } = global.userInfo

    setAvatar(avatar)
    setUsername(username)
    setBalance(balance)
    setGiftAmount(gift_amount)
    setPoint(point)
  }, [])

  const onUserInfoPress = useCallback(() => {
    if (global.isLogin) {
      navigation.navigate('UserInfo', { callback: handleLogoutSuccess })
    } else {
      navigation.navigate('Login', { callback: handleLoginSucess })
    }
  }, [handleLogoutSuccess, handleLoginSucess])

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor="transparent"
        translucent
        androidtranslucent
        barStyle="light-content"
      />

      <NavigationBar title="我的" goBackVisible={false} />

      <ScrollView>
        <TouchableOpacity onPress={onUserInfoPress} activeOpacity={0.8}>
          <Row verticalCenter style={styles.userInfoStyle}>
            <Row verticalCenter>
              <Image
                source={
                  global.isLogin
                    ? { uri: 'http://cangdu.org:8001/img/' + avatar }
                    : images.My.head
                }
                style={styles.headStyle}
              />
              <Column style={{ justifyContent: 'space-between' }}>
                <Text
                  largeSize
                  white
                  text={global.isLogin ? username : '登录/注册'}
                  style={{ fontWeight: '600', marginBottom: px2dp(10) }}
                />
                <Row verticalCenter>
                  <Image source={images.My.phone} style={{ ...wh(25, 30) }} />
                  <Text mediumSize white text="暂无绑定手机号" />
                </Row>
              </Column>
            </Row>
            <Image source={images.Common.arrowRight} style={{ ...wh(30) }} />
          </Row>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
})

export default User

const styles = StyleSheet.create({
  userInfoStyle: {
    paddingHorizontal: px2dp(20),
    paddingVertical: px2dp(25),
    justifyContent: 'space-between',
    backgroundColor: colors.theme
  },
  headStyle: {
    ...wh(100),
    borderRadius: px2dp(50),
    marginRight: px2dp(10)
  }
})
