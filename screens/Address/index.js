import React, { memo, useEffect, useMemo, useCallback } from 'react'
import { View, Image, StyleSheet, StatusBar } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import { colors, images } from '../../constants'
import { getAddressList, deleteItem } from '../../action/member'
import { bindActionCreators } from 'redux'
import { px2dp, wh } from '../../utils/screen'
import Column from '../../components/Column'
import NavigationBar from '../../components/NavigationBar'
import Text from '../../components/Text'

const index = memo(({ route, navigation }) => {
  const { list } = useSelector(({ member }) => member)
  const dispatch = useDispatch()

  const actions = useMemo(() => {
    return bindActionCreators(
      {
        getAddressList,
        deleteItem
      },
      dispatch
    )
  }, [dispatch])

  const onAddressItemPress = useCallback(
    item => {
      const { choice, callback } = route.params
      if (choice) {
        callback && callback(item)
        navigation.goBack()
      }
    },
    [route, navigation]
  )

  const onDeleteAddressItemPress = useCallback(
    item => {
      actions.deleteItem(item)
    },
    [actions]
  )

  const handleAddAddressSuccess = useCallback(
    status => {
      if (status) {
        actions.getAddressList(global.userInfo.user_id)
      }
    },
    [actions]
  )

  const onGoBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const onMenuClick = useCallback(() => {
    navigation.navigate('AddAddress', { callback: handleAddAddressSuccess })
  }, [navigation, handleAddAddressSuccess])

  useEffect(() => {
    actions.getAddressList(global.userInfo.user_id)
  }, [actions])

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
        title="收货地址"
        onGoBackPress={onGoBackPress}
        rightItem={
          <TouchableOpacity onPress={onMenuClick}>
            <Text white text="新增" style={{ margin: px2dp(10) }} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={list}
        keyExtractor={(_, index) => index + ''}
        renderItem={({ item }) => (
          <AddressItem
            item={item}
            choice={route.params.choice}
            onDelete={onDeleteAddressItemPress}
            onPress={onAddressItemPress}
          />
        )}
        ItemSeparatorComponent={() => <Divider style={{ height: px2dp(20) }} />}
      />
    </View>
  )
})

const AddressItem = memo(({ item, choice, onDelete, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={choice ? 0.1 : 1}
      onPress={() => onPress(item)}
    >
      <Row style={styles.itemStyle}>
        <Column style={{ justifyContent: 'space-between' }}>
          <Text mediumSize text={item.address} />
          <Text mediumSize text={item.phone} />
        </Column>
        <TouchableOpacity onPress={() => onDelete(item)}>
          <Image
            source={images.Common.close}
            style={{ ...wh(30), margin: px2dp(10) }}
          />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  )
})

export default index

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent: 'space-between',
    padding: px2dp(20),
    backgroundColor: colors.white
  }
})
