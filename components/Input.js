import React, { memo, useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { colors } from '../constants'
import Row from './Row'
import Text from './Text'
import { px2dp } from '../utils/screen'
import { TextInput } from 'react-native-gesture-handler'

const Input = memo(
  ({
    bgViewStyle,
    label,
    value,
    labelStyle,
    id,
    style,
    secureTextEntry,
    keyboardType,
    selectionColor,
    numberOfLines,
    onChange,
    placeholder,
    placeholderTextColor,
    children
  }) => {
    const [text, setText] = useState(value)

    useEffect(() => {
      setText(text)
    }, [value])

    return (
      <Row
        verticalCenter
        style={StyleSheet.flatten([{ flex: 1 }, bgViewStyle])}
      >
        {label ? (
          <Text
            text={label}
            style={StyleSheet.flatten([{ marginRight: px2dp(20) }, labelStyle])}
          />
        ) : null}
        <TextInput
          ref={id}
          style={StyleSheet.flatten([styles.inputStyle, style])}
          selectionColor={selectionColor}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          autoFocus={false}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={text}
          onChangeText={text => {
            setText(text)
            onChange(text)
          }}
        />
        {children}
      </Row>
    )
  }
)

Input.propTypes = propTypes = {
  label: PropTypes.string,
  selectionColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    'default',
    'numeric',
    'email-address',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'phone-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search'
  ]),
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
  onChangeText: PropTypes.func, //接收数据
  numberOfLines: PropTypes.number
}

Input.defaultProps = {
  selectionColor: colors.theme,
  secureTextEntry: false,
  keyboardType: 'default',
  placeholder: '',
  placeholderTextColor: colors.gray3,
  value: '',
  numberOfLines: 1
}

export default Input

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: px2dp(28),
    color: colors.black,
    paddingVertical: 0
  }
})
