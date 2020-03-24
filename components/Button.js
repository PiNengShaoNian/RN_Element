import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { colors } from '../constants'

const Button = memo(
  ({
    style,
    title,
    titleStyle,
    activeOpacity,
    disabled,
    children,
    ...others
  }) => {
    let backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      paddingVertical,
      paddingHorizontal
    let textColor, textFontSize
    //button default props
    activeOpacity = 0.8
    borderWidth = 0
    borderRadius = 0
    borderColor = colors.theme
    paddingVertical = 0
    paddingHorizontal = 0
    backgroundColor = colors.theme
    //title default props
    textColor = colors.white
    textFontSize = 14

    style = [
      {
        backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }
    ].concat(style)
    style = StyleSheet.flatten(style)
    if (disabled) {
      style.opacity = 0.4
    }

    if (
      !React.isValidElement(title) &&
      (title || title === '' || title === 0)
    ) {
      titleStyle = [
        {
          color: textColor,
          fontSize: textFontSize,
          overflow: 'hidden'
        }
      ].concat(titleStyle)

      title = (
        <Text style={titleStyle} numberOfLines={1}>
          {title}
        </Text>
      )

      if (title) children = title

      console.log(titleStyle)

      return (
        <TouchableOpacity
          style={style}
          title={title}
          titleStyle={titleStyle}
          activeOpacity={activeOpacity}
          disabled={disabled}
          {...others}
        >
          {children}
        </TouchableOpacity>
      )
    }
  }
)

Button.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number
  ])
}

export default Button
