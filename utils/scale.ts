import { Dimensions, Platform, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')

let statusBarHeight: number

if (StatusBar.currentHeight !== undefined) {
  statusBarHeight = StatusBar.currentHeight
} else {
  statusBarHeight = 0 // Hoặc giá trị mặc định nếu không có currentHeight
}

const hasNotch = () => {
  if (Platform.OS === 'android') {
    return statusBarHeight > 25
  }
}

const WIDTH = width
const HEIGHT =
  Platform.OS == 'android' && hasNotch() ? height + statusBarHeight : height

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width]

//Guideline sizes are based on standard ~5.5" screen mobile device
const guidelineBaseWidth = 372
const guidelineBaseHeight = 680 // optional

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size
const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size //optional
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor

const HEIGHT_WITHOUT_STATUS_BAR = height - statusBarHeight

export {
  scale,
  verticalScale,
  moderateScale,
  WIDTH,
  HEIGHT,
  HEIGHT_WITHOUT_STATUS_BAR
}
