import React, { useCallback, memo, useState, useRef } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'

import NavigationBar from '../../components/NavigationBar'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Column from '../../components/Column'
import Row from '../../components/Row'
import Input from '../../components/Input'
import Toast from '../../components/Toast'
import Button from '../../components/Button'
import { fetchSearchNearby } from '../../api/address'
import { px2dp, wh } from '../../utils/screen'
import { colors } from '../../constants'

const SearchAddress = memo(({ navigation, route }) => {
  const [address, setAddress] = useState([])
  const keyword = useRef()

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [])

  const onKeywordChange = useCallback(text => {
    keyword.current = text
  }, [])

  const onSearchBtnPress = useCallback(() => {
    if (keyword.current === '') {
      Toast.show('请输入内容')
      return
    }

    console.log(keyword)

    fetchSearchNearby(keyword.current).then(res => {
      setAddress(res)
    })
  }, [])

  const onItemPress = useCallback(
    item => {
      route.params.callback && route.params.callback(item)

      navigation.goBack()
    },
    [navigation, route]
  )

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

      <NavigationBar title="搜索地址" onGoBackPress={onGoBackPress} />

      <FlatList
        data={address}
        keyExtractor={(_, index) => index + ''}
        renderItem={({ item }) => <Item item={item} onPress={onItemPress} />}
        ListHeaderComponent={() => (
          <Header onChange={onKeywordChange} onPress={onSearchBtnPress} />
        )}
      />
    </View>
  )
})

const Item = memo(({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Column style={styles.itemStyle}>
        <Text gray text={item.name} />
        <Text gray text={item.address} />
      </Column>
    </TouchableOpacity>
  )
})

const Header = memo(({ onChange, onPress }) => {
  return (
    <Column>
      <Row verticalCenter style={styles.headStyle}>
        <Input
          style={styles.inputStyle}
          placeholder="请输入小区/写字楼/学校等"
          onChange={onChange}
        />
        <Button style={styles.searchBtnStyle} title="确认" onPress={onPress} />
      </Row>
      <Row
        horizontalCenter
        verticalCenter
        style={{ paddingVertical: px2dp(5), backgroundColor: '#fce6c9' }}
      >
        <Text
          mediumSize
          text="为了满足商家的送餐要求，建议您从列表中选择地址"
          style={{ color: '#faa460' }}
        />
      </Row>
    </Column>
  )
})

export default SearchAddress

const styles = StyleSheet.create({
  headStyle: {
    padding: px2dp(15),
    backgroundColor: colors.white
  },
  inputStyle: {
    height: px2dp(70),
    color: colors.gray4,
    backgroundColor: colors.gray,
    borderRadius: px2dp(2),
    padding: px2dp(5)
  },
  searchBtnStyle: {
    ...wh(120, 70),
    borderRadius: px2dp(5),
    marginLeft: px2dp(10)
  },
  itemStyle: {
    padding: px2dp(15),
    justifyContent: 'space-between'
  }
})
