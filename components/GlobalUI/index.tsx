import LoadingOverlay from '@/components/LoadingOverlay'
import { clearAllToast, ToastManager } from '@/libs/ToastNotify/ToastManager'
import React, { Fragment, useEffect } from 'react'

const GlobalUI = () => {
  useEffect(() => {
    clearAllToast()
  }, [])

  return (
    <Fragment>
      <LoadingOverlay />
      <ToastManager position="top" />
    </Fragment>
  )
}

export default GlobalUI
