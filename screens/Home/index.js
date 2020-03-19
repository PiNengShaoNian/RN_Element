import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { colors, images } from '../../constants'
import Visible from '../../components/Visible'
import NavigationBar from '../../components/NavigationBar'
import { px2dp } from '../../utils/screen'

const Home = ({ navigation }) => {
  const [netError, setNetError] = useState(false)
  const [navBarVisible, setNavBarVisible] = useState(true)
  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        hidden={false}
        backgroundColor="transparent"
        translucent
        androidtranslucent
        barStyle="light-content"
      />

      <Visible visible={navBarVisible}>
        <NavigationBar
          titleColor={colors.white}
          navBarImage={null}
          dividerVisible={false}
          title={'首页'}
          goBackVisible={true}
          leftItem={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
            >
              <View
                style={{
                  paddingHorizontal: px2dp(30),
                  paddingVertical: px2dp(26)
                }}
              >
                <Image
                  style={{
                    width: px2dp(20),
                    height: px2dp(30),
                    // tintColor: this.goBackColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    resizeMode: 'stretch'
                  }}
                  source={images.Common.goBack}
                />
              </View>
            </TouchableOpacity>
          }
          // centerView={this.renderTitle()}
          rightItem={null}
        />
      </Visible>
      <Visible visible={netError}>
        <Text>Home page</Text>
      </Visible>
    </View>
  )
}

Home.navigationOptions = {
  header: null
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})
