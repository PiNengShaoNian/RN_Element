import React from 'react'
import PropTypes from 'prop-types'
import { colors } from '../constants'
import { wh, px2dp } from '../utils/screen'
import { View, StyleSheet } from 'react-native'

export default Divider = ({
  horizontal,
  vertical,
  color,
  width,
  height,
  style: styleProp
}) => {
  let style
  if ((horizontal && !vertical && width !== 1) || vertical) {
    style = {
      ...wh(width, height),
      backgroundColor: color
    }
  } else {
    style = {
      flex: 1,
      height: px2dp(height),
      backgroundColor: color
    }
  }

  return <View style={StyleSheet.flatten([style, styleProp])} />
}

Divider.defaultProps = {
  horizontal: true,
  vertical: false,
  color: colors.divider,
  width: 1,
  height: 1
}

Divider.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}
