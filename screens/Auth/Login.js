import React, { useRef, useCallback, useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { colors } from '../../constants'
import Column from '../../components/Column'
import Input from '../../components/Input'
import NavigationBar from '../../components/NavigationBar'
import Button from '../../components/Button'
import Visible from '../../components/Visible'
import Toast from '../../components/Toast'
import { px2dp, wh } from '../../utils/screen'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fetchCaptcha, fetchAccountLogin } from '../../api/auth'

const Login = ({ navigation, route }) => {
  const name = useRef()
  const pwd = useRef()
  const code = useRef()
  const pwdRef = useRef()
  const [captcha, setCaptcha] = useState('')

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const fetchRefreshCaptcha = useCallback(() => {
    fetchCaptcha().then(res => {
      setCaptcha(res.code)
    })
  }, [])

  const onLoginBtnClick = useCallback(() => {
    fetchAccountLogin(name.current, pwd.current, code.current)
      .then(res => {
        global.isLogin = true
        global.userInfo = res
        route.params.callback && route.params.callback()
        navigation.goBack()
      })
      .catch(({ message }) => {
        Toast.show(message, { position: 100, duration: 400 })
      })
  }, [route, navigation])

  useEffect(() => {
    fetchRefreshCaptcha()
  }, [])

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

      <NavigationBar title="密码登录" onGoBackPress={onGoBackPress} />

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
            id={pwdRef}
            bgViewStyle={styles.input}
            label="密码"
            placeholder="请输入密码"
            secureTextEntry
            onChange={text => (pwd.current = text)}
          />
          <Divider />
          <Input
            bgViewStyle={styles.input}
            label="验证码"
            placeholder="请输入验证码"
            onChange={text => (code.current = text)}
          >
            <TouchableOpacity onPress={fetchRefreshCaptcha}>
              <Visible visible={!!captcha}>
                <Image
                  source={{ uri: decodeURIComponent(captcha) }}
                  style={styles.captchaImgStyle}
                />
              </Visible>
            </TouchableOpacity>
          </Input>
        </Column>
        <Button
          style={styles.btnStyle}
          title="确定"
          onPress={onLoginBtnClick}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login

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
  captchaImgStyle: {
    ...wh(170, 70),
    resizeMode: 'stretch'
  },
  btnStyle: {
    height: px2dp(70),
    // width: 80,
    margin: px2dp(30),
    borderRadius: px2dp(10)
  }
})
