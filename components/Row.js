import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

export default Row = ({
  verticalCenter,
  horizontalCenter,
  children,
  style: styleProp
}) => {
  const style = {
    flexDirection: 'row',
    alignItems: verticalCenter ? 'center' : 'stretch',
    justifyContent: horizontalCenter ? 'center' : 'flex-start'
  }
  return <View style={StyleSheet.flatten([style, styleProp])}>{children}</View>
}

Row.propTypes = {
  verticalCenter: PropTypes.bool,
  horizontalCenter: PropTypes.bool
}
