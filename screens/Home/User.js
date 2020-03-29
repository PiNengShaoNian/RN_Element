import React, { memo, useCallback, useState } from 'react'
import { View, StatusBar, Image, StyleSheet, ImageStore } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import NavigationBar from '../../components/NavigationBar'
import { colors, images } from '../../constants'
import Column from '../../components/Column'
import Text from '../../components/Text'
import { wh, px2dp, screenW } from '../../utils/screen'

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

        <Row
          verticalCenter
          style={{
            justifyContent: 'space-between',
            backgroundColor: colors.white
          }}
        >
          <Balance
            value={global.isLogin ? balance : '0.00'}
            color={colors.theme}
            unit="元"
            label="我的余额"
          />

          <Balance
            value={global.isLogin ? gift_amount : '0'}
            color={colors.pink}
            unit="个"
            label="我的优惠"
          />
          <Balance
            value={global.isLogin ? point : '0'}
            color={colors.reseda}
            unit="分"
            label="我的积分"
          />
        </Row>
        <Column
          style={{ marginVertical: px2dp(20), backgroundColor: colors.white }}
        >
          <ListItem img={images.My.order} label="订单" />
          <Divider style={styles.dividerStyle} />
          <ListItem img={images.My.point} label="积分商城" />
          <Divider style={styles.dividerStyle} />
          <ListItem img={images.My.vip} label="会员卡" />
        </Column>

        <Column
          style={{ marginBottom: px2dp(20), backgroundColor: colors.white }}
        >
          <ListItem img={images.My.service} label="服务中心" />
        </Column>
      </ScrollView>
    </View>
  )
})

const ListItem = memo(({ img, label, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(label)}>
      <Row verticalCenter style={styles.itemStyle}>
        <Row verticalCenter>
          <Image source={img} style={{ ...wh(30), marginRight: px2dp(10) }} />
          <Text text={label} />
        </Row>
        <Image
          source={images.Common.arrowRight}
          style={{ ...wh(25), tintColor: colors.gray3 }}
        />
      </Row>
    </TouchableOpacity>
  )
})

const Balance = memo(({ value, color, unit, label, onPress }) => {
  const style = label === '我的优惠' ? styles.balanceLineStyle : null

  return (
    <TouchableOpacity onPress={() => onPress(label)}>
      <Column style={[styles.balanceStyle, style]}>
        <Row style={{ alignItems: 'flex-end' }}>
          <Text
            theme
            text={value}
            style={{ fontSize: px2dp(50), color: color }}
          />
          <Text microSize text={unit} style={{ marginBottom: px2dp(10) }} />
        </Row>
        <Text text={label} />
      </Column>
    </TouchableOpacity>
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
  },
  balanceStyle: {
    width: screenW / 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: px2dp(25)
  },
  balanceLineStyle: {
    borderColor: colors.divider,
    borderTopWidth: px2dp(1),
    borderBottomWidth: px2dp(1)
  },
  dividerStyle: {
    marginLeft: px2dp(30)
  },
  itemStyle: {
    justifyContent: 'space-between',
    paddingVertical: px2dp(20),
    paddingHorizontal: px2dp(25)
  }
})
