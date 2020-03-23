import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import StarRating from './StarRating'
import Row from './Row'
import Column from './Column'
import { px2dp, wh } from '../utils/screen'
import {colors} from '../constants'

const shorten = str => {
  if (str.length <= 12) return str

  return str.slice(0, 10) + '...'
}
const baseUrl = 'http://cangdu.org:8001/img/'

const ShopListItem = ({ onPress, data }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row
        verticalCenter
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: px2dp(20),
          paddingVertical: px2dp(30),
          backgroundColor: colors.white
        }}
      >
        <Row verticalCenter>
          <Image
            source={{ uri: baseUrl + data.image_path }}
            style={{ ...wh(100) }}
          />
          <Column
            style={{ justifyContent: 'space-between', marginLeft: px2dp(20) }}
          >
            <Row verticalCenter>
              <Text
                microSize
                style={{ backgroundColor: colors.yellow }}
                text="品牌"
              />
              <Text style={styles.titleStyle} text={shorten(data.name)} />
            </Row>
            <Row verticalCenter>
              <StarRating
                max={5}
                rating={parseInt(data.rating)}
                disabled={true}
                size={13}
              />
              <Text microSize orange text={data.rating} />
              <Text microSize text={data.recent_order_num} />
            </Row>
            <Text
              microSize
              text={`￥${data.float_minimum_order_amount}起送 / 配送费约￥${data.float_delivery_fee}`}
            />
          </Column>
        </Row>

        <Column
          style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <Row verticalCenter>
            {data.supports.map((item, index) => (
              <View style={[styles.icon, { margin: px2dp(2) }]} key={index}>
                <Text microSize gray text={item.icon_name} />
              </View>
            ))}
          </Row>
          <Row verticalCenter>
            <View
              style={[
                styles.icon,
                { borderColor: colors.theme, backgroundColor: colors.theme }
              ]}
            >
              <Text microSize white text="蜂鸟专送" />
            </View>
            <View
              style={[
                styles.icon,
                { borderColor: colors.theme, marginLeft: px2dp(10) }
              ]}
            >
              <Text microSize theme text="准时达" />
            </View>
          </Row>
          <Row verticalCenter>
            <Text microSize gray text={`${data.distance} /`} />
            <Text microSize gray text={`${data.order_lead_time}`} />
          </Row>
        </Column>
      </Row>
    </TouchableOpacity>
  )
}

export default ShopListItem

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: '600',
    marginLeft: px2dp(10)
  },
  icon: {
    padding: px2dp(2),
    borderRadius: px2dp(2),
    borderWidth: px2dp(1),
    borderColor: colors.divider
  }
})
