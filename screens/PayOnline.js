import React, { useCallback, memo, useRef, useState } from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  CheckBox,
  Button
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import NavigationBar from '../components/NavigationBar'
import Column from '../components/Column'
import { colors, images } from '../constants'
import { px2dp, wh } from '../utils/screen'
import CountDownView from '../components/CountDown'
import Divider from '../components/Divider'

const PayOnline = memo(({ navigation }) => {
  const [selectIndex, setSelectIndex] = useState(0)
  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const onPaymentMethodChange = useCallback(index => {
    setSelectIndex(index)
  }, [])

  const endTime = useRef(new Date().getTime() + 1000 * 60 * 15)
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

      <NavigationBar title="在线支付" onGoBackPress={onGoBackPress} />

      <ScrollView style={styles.container}>
        <Column
          style={{
            height: px2dp(200),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white
          }}
        >
          <Text
            mediumSize
            text="支付剩余时间"
            style={{ marginBottom: px2dp(20) }}
          />
          <CountDownView
            endTime={endTime.current}
            daysStyle={styles.time}
            hoursStyle={styles.time}
            minsStyle={styles.time}
            secsStyle={styles.time}
            firstColonStyle={styles.colon}
            secondColonStyle={styles.colon}
            onEnd={() => alert('支付超时')}
          />
        </Column>
        <Text
          text="选择支付方式"
          style={{ paddingHorizontal: px2dp(25), paddingVertical: px2dp(20) }}
        />
        <PaymentMethod
          img={images.PayOnLine.alipay}
          label="支付宝"
          index={0}
          onPress={onPaymentMethodChange}
          selectIndex={selectIndex}
        />
        <Divider />
        <PaymentMethod
          img={images.PayOnLine.wechat}
          label="微信"
          index={1}
          onPress={onPaymentMethodChange}
          selectIndex={selectIndex}
        />
        <Button title="确认支付" style={styles.btnStyle} />
      </ScrollView>
    </View>
  )
})

const PaymentMethod = memo(({ img, label, index, onPress, selectIndex }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(index)}>
      <Row verticalCenter style={styles.itemStyle}>
        <Row verticalCenter>
          <Image source={img} style={{ ...wh(80), marginRight: px2dp(10) }} />
          <Text text={label} />
        </Row>
        <CheckBox disabled value={selectIndex === index} />
      </Row>
    </TouchableOpacity>
  )
})

export default PayOnline

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: px2dp(25),
    paddingVertical: px2dp(20),
    backgroundColor: colors.white
  },
  time: {
    fontSize: px2dp(50),
    fontWeight: '500',
    color: colors.black,
    marginHorizontal: px2dp(3),
    marginHorizontal: px2dp(3)
  },
  btnStyle: {
    margin: px2dp(20),
    height: px2dp(70),
    borderRadius: px2dp(5),
    backgroundColor: colors.reseda
  }
})
