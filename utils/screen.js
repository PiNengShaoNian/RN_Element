import { Dimensions } from 'react-native'

export const screenW = Dimensions.get('window').width
export const screenH = Dimensions.get('window').height
export const DEFAULT_DENSITY = 2

const w2 = 750 / DEFAULT_DENSITY
const h2 = 1334 / DEFAULT_DENSITY

export const px2dp = size => {
  let scaleWidth = screenW / w2
  let scaleHeight = screenH / h2
  let scale = Math.min(scaleWidth, scaleHeight)
  size = Math.round(size * scale + 0.5)

  return size / DEFAULT_DENSITY
}
