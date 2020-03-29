import RN_Toast from 'react-native-root-toast'

export default {
  show(
    msg,
    config = {
      position: 0,
      duration: 2000,
      shadow: false,
      amination: true
    }
  ) {
    RN_Toast.show(msg, config)
  }
}
