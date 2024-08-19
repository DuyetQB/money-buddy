import { PixelRatio } from 'react-native'
import { moderateScale } from './scale'

const scaleSystem = PixelRatio.getFontScale()

const fontScale = (size: number) => moderateScale(size, 0.5)
const spaceScale = (size: number) => moderateScale(size, 0.8)

export const fontUnit = fontScale(1) / scaleSystem
export const spaceUnit = spaceScale(1)

// ------------------------------------------------------- //

// standard font size
export const unit = fontUnit
export const uF = fontUnit
export const rem = 14 * fontUnit

// standard space unit size
export const uS = spaceUnit
