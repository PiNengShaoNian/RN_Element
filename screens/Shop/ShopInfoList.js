import React, { memo, useRef } from 'react'
import { SectionList, Button, View, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Column from '../../components/Column'
import Button from '../../components/Button'
import Mock from './Mock'
import { colors } from '../../constants'
import { px2dp } from '../../utils/screen'

const ShopInfoList = () => {
  const section = useRef()

  const scrollToLocation = index => {
    if (index <= Mock.length) {
      section.current.scrollToLocation({ animated: false, itemIndex: index })
    }
  }

  return (
    <Column style={styles.container}>
      <Row style={{ flex: 1 }}>
        <FlatList
          style={styles.leftList}
          data={ParcelData}
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
          renderItem={() => <RightRow />}
        />
      </Row>
    </Column>
  )
}

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

const RightRow = memo(() => {
  return (
    <View style={styles.rItem}>
      <Row style={{ flex: 1 }}>
        <Image style={styles.icon} source={{ uri: item.img }} />
        <Column style={styles.rItemDetail}></Column>
      </Row>
    </View>
  )
})

export default ShopInfoList
