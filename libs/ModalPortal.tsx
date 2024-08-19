import Portal from './Portal'
import { height, width } from '@/utils/common'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  ReactNode
} from 'react'
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  StyleProp
} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedKeyboardAvoidingView =
  Animated.createAnimatedComponent(KeyboardAvoidingView)

// Only use this component wrapped inside a <Portal.Host> component.

// <Portal.Host> component should be inside a full screen component.

// Bug on IOS, sometime, modal onIOS is scale not expect on somewhere first rerender on parent view because of modalAnimated (unknow reason), so please alway render Modal at the first time and control render child inside, see ModalDatePicker to see example ({date && ...}).

export type IModalProps = {
  children: ReactNode
  modalStyle?: StyleProp<any>
  backDropColor?: string
  animationTimeIn?: number
  animationTimeout?: number
  onPressBackdrop?: () => void
  onBackHandler?: () => void
  lazyLoad?: boolean
  unmountOnHide?: boolean
  onAnimatedOpenEnd?: () => void
  onAnimatedCloseEnd?: () => void
  containInputControlKeyboard?: boolean
  dynamicPosition?: boolean
  borderAnimatedDynamicInterpolate?: number
  initialScaleDynamicPosition?: number
}

export type IModalRef = {
  open: (options?: any) => void
  close: () => void
}

const ModalPortal = forwardRef<IModalRef, IModalProps>(
  (
    {
      modalStyle = styles.modal,
      backDropColor = 'rgba(0,0,0,0.25)',
      animationTimeIn = 400,
      animationTimeout = 250,
      onPressBackdrop,
      onBackHandler = () => {},
      children,
      lazyLoad = true,
      unmountOnHide = false,
      onAnimatedOpenEnd = () => {},
      onAnimatedCloseEnd = () => {},
      // A props for modal contain input so that we can click outside to hide keyboard.
      containInputControlKeyboard = false,
      dynamicPosition = false,
      // For determined edge border may not want to apply borderAnimatedDynamicInterpolate,
      // set border radius on modalStyle (borderTopLeftRadius: 0 || borderBottomRightRadius: 0 || ...)
      borderAnimatedDynamicInterpolate = 0,
      initialScaleDynamicPosition = 0.2
    },

    ref
  ) => {
    const [isReady, setIsReady] = useState(!lazyLoad && !unmountOnHide)
    const animateModal = useSharedValue(0)
    const displayModal = useSharedValue(0)
    const startCoordinateModal = useSharedValue([0, 0])
    const willOpenModal = useRef(false)
    const modalLayoutRef = useRef<Animated.View>(null)

    useEffect(() => {
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])

    useLayoutEffect(() => {
      if (isReady && willOpenModal.current)
        requestAnimationFrame(() => animatedOpenModal())
      willOpenModal.current = false
    }, [isReady])

    useImperativeHandle(ref, () => ({
      open: (options) => {
        if (dynamicPosition) {
          const {
            x,
            y,
            width,
            height,
            xFactor = 1,
            yFactor = 1
          } = options?.elementLayout || {}
          startCoordinateModal.value = [
            (x + width / 2 - width / 2) * xFactor,
            (y + height / 2 - height / 2) * yFactor
          ]
        }
        if (!isReady) {
          willOpenModal.current = true
          setIsReady(true)
          return
        }
        requestAnimationFrame(() => animatedOpenModal())
      },
      close: () => {
        requestAnimationFrame(() => animatedCloseModal())
      }
    }))
    const onBackPress = useCallback(() => {
      onBackHandler()
      return true
    }, [])

    const animatedOpenModal = () => {
      displayModal.value = 1
      animateModal.value = withTiming(
        1,
        {
          easing: Easing.bezier(0.39, 0.35, 0.14, 1.26),
          duration: animationTimeIn
        },
        () => {
          runOnJS(onAnimatedOpenEnd)()
        }
      )
      BackHandler.addEventListener('hardwareBackPress', onBackPress)
    }

    const animatedCloseModal = () => {
      // When close right after open, maybe overlay still show, need that to sure close completely run !
      animateModal.value = withDelay(
        2,
        withTiming(
          0,
          {
            easing: dynamicPosition
              ? Easing.in(Easing.quad)
              : Easing.inOut(Easing.quad),
            duration: animationTimeout
          },
          () => {
            displayModal.value = 0
            runOnJS(onAnimatedCloseEnd)()
            unmountOnHide && runOnJS(setIsReady)(false)
          }
        )
      )
      Keyboard.dismiss()
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }

    const modalAnimated = useAnimatedStyle(() => {
      if (dynamicPosition) {
        return {
          borderRadius:
            borderAnimatedDynamicInterpolate > 0
              ? interpolate(
                  animateModal.value,
                  [0, 1],
                  [borderAnimatedDynamicInterpolate, 0]
                )
              : 0,
          transform: [
            {
              translateX: interpolate(
                animateModal.value,
                [0, 1],
                [startCoordinateModal.value[0], 0]
              )
            },
            {
              translateY: interpolate(
                animateModal.value,
                [0, 1],
                [startCoordinateModal.value[1], 0]
              )
            },
            {
              scale:
                initialScaleDynamicPosition +
                animateModal.value * (1 - initialScaleDynamicPosition)
            }
          ]
        }
      } else {
        return {
          transform: [
            {
              scale: 0.5 + animateModal.value * 0.5
            }
          ]
        }
      }
    })

    const containerStyle = useAnimatedStyle(() => {
      return Platform.OS == 'ios'
        ? {
            opacity: animateModal.value * 1.2,
            transform: [
              {
                scale: displayModal.value
              }
            ]
          }
        : {
            opacity: dynamicPosition
              ? interpolate(animateModal.value, [0, 0.2, 1], [0, 0.9, 1])
              : animateModal.value * 1.2,
            transform: [
              {
                translateX: (1 - displayModal.value) * width * 2
              }
            ]
            //   display: displayModal.value ? "flex" : "none",
            //   width: displayModal.value == 1 ? "100%" : "0%",
            //   height: displayModal.value == 1 ? "100%" : "0%",
          }
    })

    return (
      <Portal>
        <AnimatedKeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.modalContainer, containerStyle]}
        >
          <AnimatedPressable
            style={[styles.backdrop, { backgroundColor: backDropColor }]}
            onPress={() => {
              onPressBackdrop ? onPressBackdrop() : animatedCloseModal()
            }}
          />

          <Animated.View
            ref={modalLayoutRef}
            onStartShouldSetResponder={() => containInputControlKeyboard}
            onResponderRelease={
              containInputControlKeyboard ? Keyboard.dismiss : undefined
            }
            style={[
              modalStyle,
              modalAnimated,
              borderAnimatedDynamicInterpolate ? { overflow: 'hidden' } : null
            ]}
          >
            {isReady && children}
          </Animated.View>
        </AnimatedKeyboardAvoidingView>
      </Portal>
    )
  }
)

export default ModalPortal

const styles = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#DEE0E1'
  },
  modal: {}
})
