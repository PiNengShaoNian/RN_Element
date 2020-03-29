import React, { memo, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, Image, StatusBar } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Column from '../../components/Column'
import Input from '../../components/Input'
import Divider from '../../components/Divider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fetchCaptcha, fetchUpdatePwd } from '../../api/auth'
import Button from '../../components/Button'
import Toast from '../../components/Toast'
import { colors } from '../../constants'
import { px2dp, wh } from '../../utils/screen'

const ModifyPwd = memo(({ navigation }) => {
  const [captcha, setCaptcha] = useState('')

  const name = useRef()
  const oldPwd = useRef()
  const pwd = useRef()
  const code = useRef()
  const confirmPwd = useRef()

  const fetchRefreshCaptcha = useCallback(() => {
    fetchCaptcha().then(res => {
      setCaptcha(res.code)
    })
  }, [])

  const onConfirm = useCallback(() => {
    if (name.current === '') {
      Toast.show('请输入手机号/邮箱/用户名')
      return
    }
    if (oldPwd.current === '') {
      Toast.show('请输入旧密码')
      return
    }
    if (pwd.current === '') {
      Toast.show('请输入新密码')
      return
    }
    if (confirmPwd.current === '') {
      Toast.show('请输入确认密码')
      return
    }
    if (code.current === '') {
      Toast.show('请输入验证码')
      return
    }

    fetchUpdatePwd(
      name.current,
      oldPwd.current,
      pwd.current,
      confirmPwd.current,
      code.current
    ).then(res => {
      navigation.goBack()
      alert('密码修改成功')
    })
  }, [navigation])

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
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

      <NavigationBar
        onGoBackPress={onGoBackPress}
        title="修改用户名"
        // goBackVisible={false}
      />

      <KeyboardAwareScrollView style={styles.container}>
        <Column style={styles.content}>
          <Input
            bgViewStyle={styles.input}
            label="账号"
            placeholder="请输入账号"
            onChange={text => (name.current = text)}
          />
          <Divider />
          <Input
            bgViewStyle={styles.input}
            label="旧密码"
            placeholder="请输入旧密码"
            secureTextEntry
            onChange={text => (oldPwd.current = text)}
          />
          <Divider />
          <Input
            bgViewStyle={styles.input}
            label="新密码"
            placeholder="请输入新密码"
            secureTextEntry
            onChange={text => (pwd.current = text)}
          />
          <Input
            bgViewStyle={styles.input}
            label="确认密码"
            placeholder="请输入确认密码"
            secureTextEntry
            onChange={text => (confirmPwd.current = text)}
          />
          <Input
            bgViewStyle={styles.input}
            label="验证码"
            placeholder="请输入验证码"
            onChange={text => (code.current = text)}
          >
            <TouchableOpacity onPress={fetchRefreshCaptcha}>
              {captcha ? (
                <Image
                  style={styles.captchaImgStyle}
                  source={{ uri: decodeURIComponent(captcha) }}
                />
              ) : null}
            </TouchableOpacity>
          </Input>
        </Column>
        <Button style={styles.btnStyle} title="确定" onPress={onConfirm} />
      </KeyboardAwareScrollView>
    </View>
  )
})

export default ModifyPwd

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: px2dp(20),
    backgroundColor: colors.white
  },
  input: {
    padding: px2dp(20)
  },
  btnStyle: {
    height: px2dp(88),
    margin: px2dp(30),
    borderRadius: px2dp(15)
  },
  captchaImgStyle: {
    ...wh(170, 70),
    resizeMode: 'contain'
  }
})
