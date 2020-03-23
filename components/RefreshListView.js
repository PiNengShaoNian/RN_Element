import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
}

export default RefreshListView = ({
  listRef,
  footerContainerStyle: footerContainerStyleProp,
  footerTextStyle: footerTextStyleProp,
  footerRefreshingText,
  footerFailureText,
  footerNoMoreDataText,
  footerEmptyDataText,
  renderItem,
  refreshState,
  onFooterRefresh,
  onHeaderRefresh,
  ...rest
}) => {
  
  return (
    <FlatList
      ref={listRef}
      onEndReached={() => {
        if (rest.data.length === 0 || refreshState !== RefreshState.Idle) return

        onFooterRefresh && onFooterRefresh(RefreshState.FooterRefreshing)
      }}
      onRefresh={() => {
        if (
          refreshState === RefreshState.HeaderRefreshing ||
          refreshState === RefreshState.FooterRefreshing
        )
          return

        onHeaderRefresh & onHeaderRefresh(RefreshState.HeaderRefreshing)
      }}
      refreshing={refreshState === RefreshState.HeaderRefreshing}
      onEndReachedThreshold={0.1}
      renderItem={renderItem}
      {...rest}
      ListFooterComponent={() => {
        const footerContainerStyle = [
          styles.footerContainer,
          footerContainerStyleProp
        ]
        const footerTextStyle = [styles.footerText, footerTextStyleProp]

        if (RefreshState.Idle === refreshState)
          return <View style={footerContainerStyle} />
        else if (RefreshState.Failure === refreshState)
          return (
            <TouchableOpacity
              style={footerContainerStyle}
              onPress={() => {
                onFooterRefresh &&
                  onFooterRefresh(RefreshState.FooterRefreshing)
              }}
            >
              <Text style={footerTextStyle}>{footerFailureText}</Text>
            </TouchableOpacity>
          )
        else if (RefreshState.EmptyData === refreshState)
          return (
            <TouchableOpacity
              style={footerContainerStyle}
              onPress={() => {
                onFooterRefresh &&
                  onFooterRefresh(RefreshState.FooterRefreshing)
              }}
            >
              <Text style={footerTextStyle}>{footerEmptyDataText}</Text>
            </TouchableOpacity>
          )
        else if (RefreshState.FooterRefreshing === refreshState)
          return (
            <View style={footerContainerStyle}>
              <ActivityIndicator size="small" color="#888" />
              <Text style={[footerTextStyle, { marginLeft: 7 }]}>
                {footerRefreshingText}
              </Text>
            </View>
          )
        else if (RefreshState.NoMoreData === refreshState)
          return (
            <View style={footerContainerStyle}>
              <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
            </View>
          )
        else return null
      }}
    />
  )
}

RefreshListView.defaultProps = {
  footerRefreshingText: '数据加载中…',
  footerFailureText: '点击重新加载',
  footerNoMoreDataText: '已加载全部数据',
  footerEmptyDataText: '暂时没有相关数据'
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44
  },
  footerText: {
    fontSize: 14,
    color: '#555'
  }
})
