import React, { useCallback, memo, useRef, useState } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler'

import NavigationBar from '../../components/NavigationBar'
import Column from '../../components/Column'
import Input from '../../components/Input'
import Text from '../../components/Text'
import { colors } from '../../constants'
import { px2dp } from '../../utils/screen'
import Button from '../../components/Button'
import Toast from '../../components/Toast'
import { fetchAddAddress } from '../../api/address'

const AddAddress = memo(({ navigation, route }) => {
  const name = useRef('')
  const detailAddress = useRef('')
  const phone = useRef('')
  const address = useRef({})
  const [addressName, setAddressName] = useState('')
  const [item2HasValue, setItem2HasValue] = useState(false)

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [])

  const handleAddAddress = useCallback(_address => {
    address.current = _address
    setItem2HasValue(true)
    setAddressName(_address.name)
  }, [])

  const onAddressClick = useCallback(() => {
    navigation.navigate('SearchAddress', { callback: handleAddAddress })
  }, [navigation, handleAddAddress])

  const onBtnPress = useCallback(() => {
    if (name.current === '') return Toast.show('请输入您的姓名')

    if (addressName === '') return Toast.show('请选择地址')

    if (detailAddress.current === '') return Toast.show('请填写详细送餐地址')

    if (phone.current === '') return Toast.show('请输入手机号')

    fetchAddAddress(
      global.userInfo.user_id,
      addressName,
      detailAddress.current,
      address.current.geohash,
      name.current,
      phone.current
    ).then(res => {
      Toast.show(res.success)
      route.params.callback && route.params.callback(true)
      navigation.goBack()
    })
  }, [addressName, route, navigation])

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

      <NavigationBar title="新增地址" onGoBackPress={onGoBackPress} />

      <KeyboardAwareScrollView>
        <Column style={styles.contentStyle}>
          <Input
            style={styles.inputStyle}
            placeholder="请填写您的姓名"
            onChange={text => (name.current = text)}
          />
          <TouchableOpacity onPress={onAddressClick} activeOpacity={1}>
            <Row style={styles.inputStyle}>
              <Text
                text={addressName || '小区/写字楼/学校等'}
                style={{ color: item2HasValue ? colors.black : colors.gray3 }}
              />
            </Row>
          </TouchableOpacity>
          <Input
            style={styles.inputStyle}
            placeholder="请填写详细送餐地址"
            onChange={text => (detailAddress.current = text)}
          />
          <Input
            style={styles.inputStyle}
            placeholder="请填写能够联系到您的手机号"
            onChange={text => (phone.current = text)}
          />
        </Column>
        <Button title="新增地址" style={styles.btnStyle} onPress={onBtnPress} />
      </KeyboardAwareScrollView>
    </View>
  )
})

export default AddAddress

const styles = StyleSheet.create({
  contentStyle: {
    padding: px2dp(20),
    marginTop: px2dp(20),
    backgroundColor: colors.white
  },
  inputStyle: {
    paddingHorizontal: px2dp(10),
    paddingVertical: px2dp(15),
    marginBottom: px2dp(20),
    borderWidth: px2dp(1),
    borderColor: colors.divider,
    borderRadius: px2dp(3),
    backgroundColor: colors.gray
  },
  btnStyle: {
    margin: px2dp(20),
    paddingVertical: px2dp(20),
    borderRadius: px2dp(5),
    backgroundColor: colors.reseda
  }
})
