import React, { memo, useCallback, useState } from 'react'
import { View, StatusBar, StyleSheet, Image } from 'react-native'
import {
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'

import NavigationBar from '../../components/NavigationBar'
import Button from '../../components/Button'
import Column from '../../components/Column'
import Row from '../../components/Row'
import Toast from '../../components/Toast'
import Text from '../../components/Text'
import ShopListItem from '../../components/ShopListItem'
import { colors, images } from '../../constants'
import { px2dp, wh, screenW } from '../../utils/screen'
import Visible from '../../components/Visible'
import { searchShop, deleteHis, showHistory, clearHis } from '../../action/find'

const Find = memo(({ navigation }) => {
  const { geohash } = useSelector(({ home }) => home)
  const { hasShop, shopList, hasHistory, hisList } = useSelector(
    ({ find }) => find
  )
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState('')
  const onKeywordChange = useCallback(text => {
    setKeyword(text)
    if (text.length) dispatch(showHistory())
  }, [])
  const onSearchBtnPress = useCallback(() => {
    if (keyword === '') {
      Toast.show('请输入内容')
      return
    }

    dispatch(searchShop(geohash, keyword))
  }, [geohash, keyword, dispatch])

  const onDeleteHis = useCallback(
    item => {
      dispatch(deleteHis(item))
    },
    [dispatch]
  )

  const clearHistory = useCallback(() => {
    dispatch(clearHis())
  }, [dispatch])

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

      <NavigationBar title="发现" goBackVisible={false} />

      <Column verticalCenter style={styles.contain}>
        <Row verticalCenter style={styles.headStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="请输入商家或美食名称"
            placeholderTextColor={colors.gray4}
            selectionColor={colors.theme}
            numberOfLines={1}
            autoFocus={false}
            underlineColorAndroid="transparent"
            value={keyword}
            onChangeText={onKeywordChange}
          />
          <Button
            style={styles.searchBtnStyle}
            title="提交"
            onPress={onSearchBtnPress}
          />
        </Row>

        <Visible visible={!hasShop}>
          <Row
            horizontalCenter
            verticalCenter
            style={{
              height: px2dp(60),
              marginTop: px2dp(10),
              backgroundColor: colors.white
            }}
          >
            <Text text="很抱歉!无搜索结果" />
          </Row>
        </Visible>

        <Column style={styles.contain}>
          <FlatList
            style={[styles.contain, { marginTop: px2dp(10) }]}
            data={shopList}
            keyExtractor={(_, index) => index + ''}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <ShopListItem
                data={item}
                onPress={() => {
                  navigation.navigate('ShopInfo', { id: item.id })
                }}
              />
            )}
          />

          <Visible visible={false}>
            <FlatList
              style={[styles.contain, { position: 'absolute' }]}
              data={hisList}
              bounces={false}
              keyExtractor={(_, index) => index + ''}
              ListHeaderComponent={() => (
                <View style={{ margin: px2dp(20) }}>
                  <Text text="搜索历史" />
                </View>
              )}
              ListFooterComponent={() => (
                <Button
                  title="清空历史记录"
                  style={styles.clearBtnStyle}
                  titleStyle={{ color: colors.theme }}
                  onPress={clearHistory}
                />
              )}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <Row verticalCenter style={styles.hisItemStyle}>
                  <Text text={item} />
                  <TouchableOpacity
                    style={{ padding: px2dp(10) }}
                    onPress={() => onDeleteHis(item)}
                  >
                    <Image source={images.Common.close} style={{ ...wh(50) }} />
                  </TouchableOpacity>
                </Row>
              )}
            />
          </Visible>
        </Column>
      </Column>
    </View>
  )
})

export default Find

const styles = StyleSheet.create({
  contain: {
    flex: 1
  },
  headStyle: {
    padding: px2dp(15),
    backgroundColor: colors.white
  },
  inputStyle: {
    flex: 1,
    height: px2dp(70),
    fontSize: px2dp(28),
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
  hisItemStyle: {
    width: screenW,
    height: px2dp(70),
    justifyContent: 'space-between',
    padding: px2dp(15),
    marginVertical: px2dp(1),
    backgroundColor: colors.white
  },
  clearBtnStyle: {
    flex: 1,
    height: px2dp(60),
    backgroundColor: colors.white
  }
})
