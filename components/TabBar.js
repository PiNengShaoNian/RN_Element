import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { View, Animated, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TabBar = memo(
  ({
    containerWidth,
    tabs,
    scrollValue,
    backgroundColor,
    style,
    activeTab,
    goToPage,
    activeTextColor,
    inactiveTextColor,
    textStyle,
    tabStyle,
    underlineStyle
  }) => {
    const numberOfTabs = tabs.length
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      bottom: 6,
      justifiyContent: 'center',
      alignItems: 'center'
    }
    const left = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs]
    })
    return (
      <View style={[styles.tabs, { backgroundColor: backgroundColor }, style]}>
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page
          return (
            <Tab
              key={name}
              name={name}
              page={page}
              isTabActive={isTabActive}
              onPress={goToPage}
              activeTextColor={activeTextColor}
              inactiveTextColor={inactiveTextColor}
              textStyle={textStyle}
              tabStyle={tabStyle}
            />
          )
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            { transform: [{ translateX: left }] },
            underlineStyle
          ]}
        >
          <View style={{ height: 2, width: 35, backgroundColor: '#0398ff' }} />
        </Animated.View>
      </View>
    )
  }
)

const Tab = memo(
  ({
    activeTextColor,
    inactiveTextColor,
    textStyle,
    isTabActive,
    name,
    page,
    onPress,
    tabStyle
  }) => {
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        accessible={true}
        accessibilityLabel={name}
        accessibil
        ityTraits="button"
        onPress={() => onPress(page)}
      >
        <View style={[styles.tab, tabStyle]}>
          <Text
            style={[{ color: textColor, fontWeight, fontSize: 13 }, textStyle]}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
)

export default TabBar

TabBar.propTypes = {
  goToPage: PropTypes.func,
  activeTab: PropTypes.number,
  tabs: PropTypes.array,
  backgroundColor: PropTypes.string,
  activeTextColor: PropTypes.string,
  inactiveTextColor: PropTypes.string
}

TabBar.defaultProps = {
  activeTextColor: '#0398ff',
  inactiveTextColor: '#666',
  backgroundColor: '#fff'
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 36,
    justifyContent: 'space-around',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  }
})
