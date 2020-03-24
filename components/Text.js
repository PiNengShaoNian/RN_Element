import React from 'react'
import { Text as RNText } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from '../constants'
import { px2dp } from '../utils/screen'

export default Text = ({ style, text, children, ...others }) => {
  let color = colors.black
  if (others.theme) {
    color = colors.theme
  } else if (others.white) {
    color = colors.white
  } else if (others.gray) {
    color = colors.gray2
  } else if (others.orange) {
    color = colors.orange
  } else if (others.red) {
    color = colors.red
  }

  if (style && style.color && style.color.charAt(0) !== '#') {
    style.color = `#${style.color}`
  }

  let fontSize = px2dp(28)
  if (others.largeSize) {
    fontSize = px2dp(30)
  } else if (others.mediumSize) {
    fontSize = px2dp(26)
  } else if (others.smallSize) {
    fontSize = px2dp(24)
  } else if (others.microSize) {
    fontSize = px2dp(22)
  }

  style = [
    {
      color: color,
      fontSize: fontSize,
      overflow: 'hidden',
      backgroundColor: 'transparent'
    }
  ].concat(style)

  if (text || text === '' || text === 0) children = text

  return (
    <RNText style={style} text={text} {...others}>
      {children}
    </RNText>
  )
}

Text.propTypes = {
  largeSize: PropTypes.bool, // 30
  normalSize: PropTypes.bool, // 28 default
  mediumSize: PropTypes.bool, // 26
  smallSize: PropTypes.bool, // 24
  microSize: PropTypes.bool, // 22
  // 字体颜色
  theme: PropTypes.bool, // colors.theme
  white: PropTypes.bool, // colors.white
  gray: PropTypes.bool, // colors.gray2
  orange: PropTypes.bool, // colors.orange
  black: PropTypes.bool, // colors.black default
  red: PropTypes.bool,

  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
