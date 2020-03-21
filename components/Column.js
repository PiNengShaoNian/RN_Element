import React from 'react'
import { View, StyleSheet } from 'react-native'

export default Column = ({ style: styleProp, children }) => {
  return (
    <View style={StyleSheet.flatten([styles.columnStyle, styleProp])}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  columnStyle: {
    flexDirection: 'column'
  }
})
