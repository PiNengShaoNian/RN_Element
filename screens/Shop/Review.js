import React, { useEffect, useState, memo } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, Image } from 'react-native'

import {
  fetchShopSources,
  fetchShopRatingTags,
  fetchShopRatingList
} from '../../api/shop'
import Column from '../../components/Column'
import Divider from '../../components/Divider'
import StarRating from '../../components/StarRating'
import Text from '../../components/Text'
import { colors, images } from '../../constants'
import { px2dp, wh } from '../../utils/screen'

const Review = ({ shopId }) => {
  const [overallScore, setOverallScore] = useState(0)
  const [compareRating, setCompareRating] = useState('0.0%')
  const [serviceScore, setServiceScore] = useState(0)
  const [foodScore, setFoodScore] = useState(0)
  const [deliverTime, setDeliverTime] = useState(0)
  const [tags, setTags] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    fetchShopSources(shopId).then(res => {
      setOverallScore(res.overall_score)
      setCompareRating(Math.ceil(res.compare_rating) * 100 + '%')
      setServiceScore(res.service_score)
      setFoodScore(res.food_score)
      setDeliverTime(res.deliver_time)
    })

    fetchShopRatingTags(shopId).then(res => {
      setTags(res)
    })

    fetchShopRatingList(shopId).then(res => {
      setList(res)
    })
  }, [])

  return (
    <FlatList
      data={list}
      ListHeaderComponent={() => (
        <Header
          compareRating={compareRating}
          overallScore={overallScore}
          serviceScore={serviceScore}
          foodScore={foodScore}
          deliverTime={deliverTime}
          tags={tags}
        />
      )}
      ItemSeparatorComponent={Divider}
      keyExtractor={(_, index) => index + ''}
      renderItem={({ item }) => <Comment item={item} />}
    />
  )
}

const Comment = memo(({ item, index }) => {
  return (
    <Row
      style={{
        justifyContent: 'space-between',
        padding: px2dp(20),
        backgroundColor: colors.white
      }}
    >
      <Row>
        <Image
          source={images.My.head}
          style={{ ...wh(50), marginRight: px2dp(15), tintColor: colors.black }}
        />
        <Column>
          <Text mediumSize text={item.username} />
          <Row verticalCenter>
            <StarRating
              max={5}
              rating={item.rating_star}
              disabled={false}
              size={12}
            />
            <Text mediumSize text={item.time_spent_desc} />
          </Row>
          <Row style={styles.typesView}>
            {item.item_ratings.map((item, i) => (
              <Column key={i} style={{ margin: px2dp(10) }}>
                <Image source={images.Common.shopBg} style={{ ...wh(80) }} />
                <Text
                  microSize
                  text={item.food_name}
                  numberOfLines={1}
                  style={{ width: 60 }}
                />
              </Column>
            ))}
          </Row>
        </Column>
      </Row>
      <Text mediumSize text={item.rated_at}/>
    </Row>
  )
})

const Header = memo(
  ({
    compareRating,
    overallScore,
    serviceScore,
    foodScore,
    deliverTime,
    tags
  }) => {
    return (
      <Column style={{ backgroundColor: colors.white }}>
        <Row
          verticalCenter
          style={{ justifyContent: 'space-between', padding: px2dp(30) }}
        >
          <Column style={{ alignItems: 'center' }}>
            <Row>
              <StarRating
                max={5}
                disabled
                rating={parseInt(overallScore)}
                size={15}
              />
              <Text
                largeSize
                orange
                text="4.7"
                style={{ marginBottom: px2dp(10) }}
              />
            </Row>

            <Text
              mediumSize
              text="综合评价"
              style={{ marginBottom: px2dp(10) }}
            />
            <Text gray text={`高于周边商家${compareRating}`} />
          </Column>
          <Column>
            <Row verticalCenter>
              <Text
                mediumSize
                text="服务态度"
                style={{ marginRight: px2dp(15), marginBottom: px2dp(10) }}
              />
              <StarRating
                max={5}
                disabled
                rating={parseInt(serviceScore)}
                size={15}
              />
            </Row>
            <Row verticalCenter>
              <Text
                mediumSize
                text="菜品评价"
                style={{ marginRight: px2dp(15), marginBottom: px2dp(10) }}
              />
              <StarRating max={5} disabled rating={foodScore} size={15} />
              <Text mediumSize orange text="4.8" />
            </Row>
            <Row verticalCenter>
              <Text
                mediumSize
                text="送达时间"
                style={{ marginRight: px2dp(15) }}
              />
              <Text mediumSize gray text={`${deliverTime}分钟`} />
            </Row>
          </Column>
        </Row>
        <Divider color={colors.background} height={20} />

        <Row style={styles.typesView}>
          {tags.map((item, index) => (
            <Type item={item} key={index} />
          ))}
        </Row>
        <Divider />
      </Column>
    )
  }
)

const Type = ({ item }) => {
  return (
    <Row
      verticalCenter
      horizontalCenter
      style={{
        paddingHorizontal: px2dp(4),
        paddingVertical: px2dp(2),
        borderRadius: px2dp(6),
        margin: px2dp(10),
        backgroundColor: '#cae1ff'
      }}
    >
      <Text
        mediumSize
        text={`${item.name}(${item.count})`}
        style={{ color: colors.gray4 }}
      />
    </Row>
  )
}

export default Review

const styles = StyleSheet.create({
  typesView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
