import React, { memo, useCallback, useState } from 'react'
import { View, StatusBar, Image, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { colors, images } from '../../constants'
import NavigationBar from '../../components/NavigationBar'
import Column from '../../components/Column'
import Text from '../../components/Text'
import { px2dp, wh } from '../../utils/screen'
import Visible from '../../components/Visible'
import Button from '../../components/Button'

const OrderConfirm = memo(({ navigation }) => {
  const [address, setAddress] = useState()
  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleChoiceAddress = useCallback(address => {
    console.log(address)
    setAddress(address)
  }, [])

  const onChoiceAddress = useCallback(() => {
    if (!global.isLogin)
      navigation.navigate('Login', {
        // callback: handleLoginSuccess
      })
    else
      navigation.navigate('Address', {
        choice: true,
        callback: handleChoiceAddress
      })
  }, [navigation])

  const onConfirmPress = useCallback(() => {
    navigation.navigate('PayOnline')
  }, [navigation])
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

      <NavigationBar title="确认订单" onGoBackPress={onGoBackPress} />

      <Column style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Address onPress={onChoiceAddress} address={address} />

          <Row verticalCenter style={styles.timeStyle}>
            <Text largeSize text="送达时间" style={{ fontWeight: '600' }} />
            <Column style={{ alignItems: 'flex-end' }}>
              <Text theme text="尽快送达|预计 14:28" />
              <Button
                title="蜂鸟专送"
                style={{ width: px2dp(150), marginTop: px2dp(20) }}
              />
            </Column>
          </Row>

          <ItemWithImg label1="支付方式" label2="支付方式" />
          <Divider style={{ marginHorizontal: px2dp(20) }} />
          <Item label1="红包" label2="暂不支持" />

          <Row
            verticalCenter
            style={{
              padding: px2dp(20),
              marginTop: px2dp(20),
              backgroundColor: colors.white
            }}
          >
            <Image source={images.Common.shopBg} style={{ ...wh(50) }} />
            <Text text="效果演示" />
          </Row>
          <Divider />

          <Row
            verticalCenter
            style={{
              justifyContent: 'space-between',
              padding: px2dp(20),
              backgroundColor: colors.white
            }}
          >
            <Text mediumSize text="食品名称" />
            <Row verticalCenter>
              <Text
                mediumSize
                text="x2"
                style={{ color: colors.reseda, marginRight: px2dp(30) }}
              />
              <Text mediumSize text="￥20" />
            </Row>
          </Row>
          <Item label1="餐盒" label2="￥2" />
          <Item label1="配送费" label2="￥3" />
          <ItemWithImg label1="订单备注" label2="口味,偏好等" />
          <ItemWithImg label1="发票抬头" label2="不需要发票" />
          <Item />
        </ScrollView>
        <Row style={{ height: px2dp(90) }}>
          <Row
            verticalCenter
            style={{
              flex: 3,
              paddingLeft: px2dp(25),
              backgroundColor: colors.black
            }}
          >
            <Text white text="待支付 ￥211" />
          </Row>
          <Button
            title="确认下单"
            style={{
              flex: 1,
              backgroundColor: colors.reseda,
              paddingHorizontal: px2dp(30)
            }}
            onPress={onConfirmPress}
          />
        </Row>
      </Column>
    </View>
  )
})

const Item = memo(({ label1, label2 }) => {
  return (
    <Row
      verticalCenter
      style={{
        justifyContent: 'space-between',
        padding: px2dp(20),
        backgroundColor: colors.white
      }}
    >
      <Text mediumSize text={label1} />
      <Text mediumSize text={label2} style={{ color: colors.gray2 }} />
    </Row>
  )
})
const ItemWithImg = memo(({ label1, label2 }) => {
  return (
    <Row
      verticalCenter
      style={{
        justifyContent: 'space-between',
        paddingHorizontal: px2dp(20),
        paddingVertical: px2dp(15),
        backgroundColor: colors.white
      }}
    >
      <Text text={label1} />
      <Row verticalCenter>
        <Text mediumSize text={label2} style={{ color: colors.gray2 }} />
        <Image
          source={images.Common.arrowRight}
          style={{ ...wh(15), tintColor: colors.gray2 }}
        />
      </Row>
    </Row>
  )
})

const Address = memo(({ onPress, address }) => {
  console.log({ address })
  return (
    <TouchableOpacity onPress={onPress}>
      <Column style={{ backgroundColor: colors.white }}>
        <Row
          verticalCenter
          horizontalCenter
          style={{
            height: px2dp(150)
          }}
        >
          <Text text="请选择收货地址" />
        </Row>
        <Visible visible={!!address}>
          <Row
            verticalCenter
            style={{
              height: px2dp(150),
              justifyItem: 'space-between',
              paddingHorizontal: px2dp(30),
              flex: 1
            }}
          >
            <Row verticalCenter style={{ flex: 1 }}>
              <Image
                source={images.Main.location}
                style={{
                  ...wh(30),
                  tintColor: colors.theme,
                  marginRight: px2dp(10)
                }}
              />
              <Column>
                <Row verticalCenter>
                  <Text
                    largeSize
                    text="姓名"
                    style={{ fontWeight: '600', marginRight: px2dp(70) }}
                  />
                  <Text mediumSize text={address && address.name} />
                </Row>
                <Row verticalCenter>
                  <View
                    style={{
                      borderRadius: px2dp(6),
                      padding: px2dp(6),
                      marginRight: px2dp(20),
                      backgroundColor: colors.reseda
                    }}
                  >
                    <Text smallSize text="详细地址" />
                  </View>
                  <Text smallSize text={address && address.address} />
                </Row>
              </Column>
            </Row>
            <Image
              source={images.Common.arrowRight}
              style={{ ...wh(20), tintColor: colors.gray3 }}
            />
          </Row>
        </Visible>
      </Column>
    </TouchableOpacity>
  )
})

export default OrderConfirm

const styles = StyleSheet.create({
  timeStyle: {
    marginVertical: px2dp(20),
    justifyContent: 'space-between',
    borderLeftColor: colors.theme,
    borderLeftWidth: px2dp(10),
    padding: px2dp(20),
    backgroundColor: colors.white
  }
})
