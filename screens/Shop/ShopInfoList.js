import React, {
  memo,
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useMemo
} from 'react'
import { SectionList, View, Image, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'

import Column from '../../components/Column'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Visible from '../../components/Visible'
import AnimatedCart from '../../components/AnimatedCart'
import ShopBar from '../../components/ShopBar'
import Mock from './Mock'
import { colors } from '../../constants'
import { px2dp, screenW, wh } from '../../utils/screen'
import { addItem, subItem } from '../../action/shop'
import { bindActionCreators } from 'redux'

const HEADERS = []

const ShopInfoList = memo(({ navigation }) => {
  const section = useRef()
  const shopBar = useRef()
  const cart = useRef()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dispatch = useDispatch()
  const { totalPrice, totalCount, list } = useSelector(({ shop }) => shop)

  const actions = useMemo(() => {
    return bindActionCreators(
      {
        addItem,
        subItem
      },
      dispatch
    )
  }, [dispatch])

  const scrollToLocation = useCallback(index => {
    console.log({ index })
    if (index <= Mock.length) {
      section.current.scrollToLocation({
        animated: true,
        itemIndex: -1,
        sectionIndex: index,
        viewPosition: 0
      })
    }
    setSelectedIndex(index)
  }, [])

  const onViewableItemsChanged = useCallback(info => {
    let section = info.viewableItems[0].item.section

    if (section) {
      let index = HEADERS.indexOf(section)
      if (index < 0) {
        index = 0
      }

      setSelectedIndex(index)
    }
  }, [])

  const onAddItem = useCallback(item => {
    actions.addItem(item)

    shopBar.current.cartElement.measure((x, y, width, height, px, py) => {
      const endPosition = { x: px, y: py }
      cart.current.startAnim({ x: 200, y: 200 }, endPosition, () => {
        shopBar.current.runAnimate()
      })
    })
  })
  useEffect(() => {
    Mock.map((item, i) => {
      HEADERS.push(item.section)
    })
  }, [])

  return (
    <Column style={styles.container}>
      <Row style={{ flex: 1 }}>
        <FlatList
          style={styles.leftList}
          data={Mock}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={item => item.section}
          renderItem={({ item, index }) => (
            <LeftRow
              item={item}
              index={index}
              onPress={scrollToLocation}
              selectedIndex={selectedIndex}
            />
          )}
        />
        <SectionList
          ref={section}
          style={styles.rightList}
          stickySectionHeadersEnabled={true}
          sections={Mock}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={() => <Divider />}
          onViewableItemsChanged={onViewableItemsChanged}
          renderSectionHeader={({ section }) => (
            <View
              style={{
                height: 30,
                backgroundColor: '#dedede',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text>{section.section}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <RightRow item={item} onSub={actions.subItem} onAdd={onAddItem} />
          )}
        />
      </Row>
      <AnimatedCart ref={cart} />
      <ShopBar
        list={list}
        ref={shopBar}
        totalPrice={totalPrice}
        totalCount={totalCount}
        navigation={navigation}
      />
    </Column>
  )
})
const LeftRow = memo(({ item, index, selectedIndex, onPress }) => {
  return (
    <Button
      style={[
        styles.lItem,
        {
          borderBottomColor:
            index + 1 === Mock.length ? colors.divider : 'transparent',
          borderBottomWidth: index + 1 === Mock.length ? px2dp(1) : 0
        }
      ]}
      title={item.section}
      titleStyle={{
        fontSize: px2dp(26),
        color: index === selectedIndex ? colors.theme : colors.black
      }}
      onPress={() => onPress(index)}
    />
  )
})

const RightRow = memo(
  forwardRef(({ item, onAdd, onSub }, ref) => {
    const num = item.buyNum && item.buyNum

    return (
      <View style={styles.rItem}>
        <Row style={{ flex: 1 }}>
          <Image style={styles.icon} source={{ uri: item.img }} />
          <Column style={styles.rItemDetail}>
            <Text mediumSize text={item.name} style={{ fontWeight: '600' }} />
            <Row verticalCenter>
              <Text microSize text={item.sale} />
              <Text microSize text={item.favorite} style={{ marginLeft: 15 }} />
            </Row>
            <Text microSize orange text={`￥${item.money}`} />
          </Column>
          <Row
            verticalCenter
            style={{
              position: 'absolute',
              right: px2dp(20),
              bottom: px2dp(20)
            }}
          >
            <Visible visible={num}>
              <Row verticalCenter>
                <TouchableOpacity
                  style={[styles.itemActionStyle, styles.lItemActionBg]}
                  onPress={() => onSub(item)}
                >
                  <Text largeSize theme text="-" />
                </TouchableOpacity>
                <Text text={num} style={{ marginHorizontal: px2dp(20) }} />
              </Row>
            </Visible>
            <TouchableOpacity
              ref={ref}
              style={[styles.itemActionStyle, styles.rItemActionBg]}
              onPress={() => onAdd(item)}
            >
              <Text largeSize white text="+" />
            </TouchableOpacity>
          </Row>
        </Row>
      </View>
    )
  })
)

export default ShopInfoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  leftList: {
    width: (1 * screenW) / 4
  },
  rightList: {
    width: (3 * screenW) / 4
  },
  lItem: {
    minHeight: px2dp(80),
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  icon: {
    height: 60,
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#999'
  },
  rItemDetail: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 5,
    justifyContent: 'space-between'
  },
  itemActionStyle: {
    ...wh(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  lItemActionBg: {
    borderRadius: px2dp(20),
    borderWidth: px2dp(1),
    backgroundColor: colors.theme,
    backgroundColor: colors.white
  },
  rItemActionBg: {
    borderRadius: px2dp(20),
    backgroundColor: colors.theme
  }
})
