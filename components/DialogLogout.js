import React, { useRef, memo, useCallback, forwardRef } from 'react'
import { View } from 'react-native'

import { px2dp, wh } from '../utils/screen'
import { colors } from '../constants'
import Button from './Button'
import Text from './Text'
import Modal from './Modal'

const DialogLogout = memo(
  forwardRef(({ onConfirm }, ref) => {
    const onRightBtnPress = useCallback(() => {
      ref.current.hide()
      onConfirm()
    }, [])

    return (
      <Modal ref={ref}>
        <View
          style={{
            backgroundColor: 'white',
            minWidth: 260,
            minHeight: 180,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            text="确定退出吗？"
            style={{ fontSize: px2dp(40), marginBottom: px2dp(60) }}
          />
          <Row verticalCenter>
            <Button
              style={{
                ...wh(150, 65),
                backgroundColor: colors.gray2
                // borderRadius: px2dp(15)
              }}
              title="再等等"
              onPress={() => ref.current.hide()}
            />
            <Button
              style={{
                ...wh(150, 65),
                backgroundColor: colors.orange,
                // borderRadius: px2dp(15)
                marginLeft: px2dp(30)
              }}
              title="退出登录"
              onPress={onRightBtnPress}
            />
          </Row>
        </View>
      </Modal>
    )
  })
)

export default DialogLogout
