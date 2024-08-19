import ModalPortal from '@/libs/ModalPortal'
// import { Color } from '@utils/color'
// import { rem } from '@utils/styleContants'
import React, { ElementRef, useMemo, useRef, useState } from 'react'
// import { ActivityIndicator, StyleSheet } from 'react-native'
import { useOnlyDidUpdateEffect } from '@/hooks/useOnlyDidUpdateEffect'
import LoadingIcon from '../Loading'
// import { RotateLogoPage } from '@libs/Loading/RotateLogo'
// import theme from 'theme'
// const LoadingIcon = ({ color }: { color: string }) => (
//   <ActivityIndicator size={'large'} color={color} animating={true} />
// )

type IOpenAndCloseLoading = {
  message: string
  isOpen: boolean
}

const LoadingOverlay = () => {
  const [data, setData] = useState<IOpenAndCloseLoading>({
    message: 'Loading...',
    isOpen: false
  })

  const modalRef = useRef<ElementRef<typeof ModalPortal>>(null)

  useOnlyDidUpdateEffect(() => {
    if (data.isOpen) {
      modalRef.current?.open()
    } else modalRef.current?.close()
  }, [data.isOpen])

  const openLoadingOverlay = ({
    message = 'Đang tải...'
  }: {
    message?: string
  }) => {
    setData({
      message,
      isOpen: true
    })
  }

  const closeLoadingOverlay = () => {
    setData((prev) => ({
      ...prev,
      isOpen: false
    }))
  }

  LoadingOverLay.openLoadingOverlay = openLoadingOverlay

  LoadingOverLay.closeLoadingOverlay = closeLoadingOverlay

  return useMemo(
    () => (
      <ModalPortal
        ref={modalRef}
        onPressBackdrop={() => {}}
        lazyLoad={false}
        unmountOnHide={true}
        animationTimeIn={100}
        animationTimeout={50}
        backDropColor={'rgba(0,0,0,0.75)'}
      >
        {/* <View style={styles.container}>
          <LoadingIcon color={styles.loadingIcon.color} />
          <Text style={styles.textLoading}> {data.message} </Text>
        </View> */}
         <LoadingIcon color="#ffffff" />
      </ModalPortal>
    ),
    [data.message]
  )
}

export default LoadingOverlay

const LoadingOverLay = {} as {
  openLoadingOverlay: any
  closeLoadingOverlay: any
}

export const openLoadingOverlay = ({
  message = 'Đang tải...'
}: {
  message?: string
}) => {
  LoadingOverLay.openLoadingOverlay &&
    LoadingOverLay.openLoadingOverlay({ message })
}

export const closeLoadingOverlay = () => {
  LoadingOverLay.closeLoadingOverlay && LoadingOverLay.closeLoadingOverlay()
}

// const styles = StyleSheet.create({
//   backdrop: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.5)'
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalStyle: {
//     height: 200,
//     width: 200,
//     backgroundColor: 'white'
//   },
//   container: {
//     backgroundColor: 'white',
//     width: 200 * unit,
//     height: 112 * unit,
//     borderRadius: 12 * unit,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16 * unit
//   },
//   loadingIcon: {
//     color: Color.greenBlue
//   },
//   textLoading: {
//     textAlign: 'center',
//     paddingTop: 12 * unit,
//     color: Color.gray_13,
//     fontSize: 16 * unit,
//     fontFamily: 'regular'
//   }
// })
