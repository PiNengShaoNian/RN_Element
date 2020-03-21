import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { colors } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function StarRating({
  disabled,
  size,
  onStarChange,
  rating,
  max
}) {
  const onPressStar = _rating => {
    if (disabled) return
    if (_rating === rating) return

    onStarChange && onStarChange(rating)
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: max }, (_, i) => (
        <TouchableOpacity activeOpacity={0.2} key={i} onPress={onPressStar}>
          <Text
            style={[
              i + 1 <= rating ? styles.selectedColor : styles.unSelectedColor,
              {
                fontSize: size
              }
            ]}
          >
            {'\u2605'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

StarRating.defaultProps = {
  disabled: true,
  max: 5,
  rating: 0
}

StarRating.propTYpes = {
  disabled: PropTypes.bool,
  max: PropTypes.number,
  rating: PropTypes.number,
  onStarChange: PropTypes.func,
  size: PropTypes.number
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedColor: {
    color: colors.orange
  },
  unSelectedColor: {
    color: '#999'
  }
})
