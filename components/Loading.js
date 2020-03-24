import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = ({ visible, children }) => {
  return (
    <>
      {visible ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="small" color="#888" />
        </View>
      ) : (
        children
      )}
    </>
  )
}

export default Loading
