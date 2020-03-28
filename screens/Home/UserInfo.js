import React, { memo, useState } from 'react'
import { View, StyleSheet, StatusBar, Image } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import NavigationBar from '../../components/NavigationBar'
import Text from '../../components/Text'
import Row from '../../components/Row'
import Divider from '../../components/Divider'
import { images, colors } from '../../constants'
import { wh, px2dp } from '../../utils/screen'
import Button from '../../components/Button'

const UserInfo = memo(() => {
  const [username, setUsername] = useState(global.userInfo.username)
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

      <NavigationBar title="账号信息" goBackVisible={false} />

      <ScrollView style={styles.container}>
        <Divider style={styles.headDividerStyle} />

        <Item
          label="头像"
          view={
            <Image
              source={{
                uri: 'http://cangdu.org:8001/img/' + global.userInfo.avatar
              }}
              style={styles.iconHeadStyle}
            />
          }
        />

        <Divider />

        <Item label="用户名" view={<Text text={username} />} />

        <Divider />

        <Item label="收货地址" />

        <Divider />
        <Item2 label="账号绑定" />
        <Item
          label="手机"
          view={<Text text={global.userInfo.mobile} />}
          img={<Image source={Images.My.phone} style={styles.iconPhoneStyle} />}
        />
        <Item2 label="安全设置" />
        <Item label="登录密码" view={<Text gray text="修改" />} />
        <Button style={styles.logoutBtnStyle} title="退出登录" onPress={}/>
      </ScrollView>
    </View>
  )
})

const Item = memo(({ img = null, label, view = null, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(label)} activeOpacity={0.6}>
      <Row verticalCenter style={styles.itemStyle}>
        <Row verticalCenter>
          {img !== null ? img : null}
          <Text text={label} />
        </Row>

        <Row verticalCenter>
          {view !== null ? view : null}
          <Image
            source={images.Common.arrowRight}
            style={{
              ...wh(25),
              marginLeft: px2dp(10),
              tintColor: colors.gray2
            }}
          />
        </Row>
      </Row>
    </TouchableOpacity>
  )
})

const Item2 = memo(({ label }) => {
  return (
    <Row
      verticalCenter
      style={[styles.itemStyle, { backgroundColor: colors.background }]}
    >
      <Text text={label} />
    </Row>
  )
})

export default UserInfo

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headDividerStyle: {
    height: px2dp(20),
    backgroundColor: colors.background
  },
  itemStyle: {
    justifyContent: 'space-between',
    paddingVertical: px2dp(25),
    paddingHorizontal: px2dp(20)
  },
  iconHeadStyle: {
    ...wh(80),
    borderRadius: px2dp(30)
  }
})
