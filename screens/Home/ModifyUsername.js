import React, { memo, useRef, useCallback } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import NavigationBar from '../../components/NavigationBar'
import Column from '../../components/Column'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Toast from '../../components/Toast'
import Input from '../../components/Input'
import { px2dp } from '../../utils/screen'
import { colors } from '../../constants'

const ModifyUsername = memo(({ navigation, route }) => {
  const name = useRef('')

  const onConfirm = useCallback(() => {
    if (name.current === '') return Toast.show('请输入用户名')

    global.userInfo.username = name.current
    route.params.callback && route.params.callback()
    navigation.goBack()
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

      <KeyboardAwareScrollView>
        <Column style={styles.container}>
          <Input
            style={styles.inputStyle}
            placeholder="请输入用户名"
            onChange={text => (name.current = text)}
          />
          <Text microSize gray text="用户名只能修改一次（5-24字符之间）" />
          <Button
            style={styles.btnStyle}
            title="确认修改"
            onPress={onConfirm}
          />
        </Column>
      </KeyboardAwareScrollView>
    </View>
  )
})

export default ModifyUsername

const styles = StyleSheet.create({
  container: {
    margin: px2dp(20)
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: px2dp(10),
    paddingVertical: px2dp(15),
    marginBottom: px2dp(20),
    borderColor: colors.gray,
    borderWidth: px2dp(1),
    borderRadius: px2dp(3)
  },
  btnStyle: {
    height: px2dp(80),
    marginTop: px2dp(30)
  }
})
