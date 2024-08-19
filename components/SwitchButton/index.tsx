import React, { useState } from 'react'
import { Switch, useColorScheme } from 'react-native'
import { ThemedView } from '../ThemedView'

const SwitchButton = () => {
    // const setColorScheme = useColorScheme();
    const [value,setValue] = useState(false)
  
  const toggleSwitch = () => {
    setValue(true)
    // setColorScheme(value ? 'light':'dark')
  }


  return (
      <Switch
        value={value}
        onValueChange={() => toggleSwitch()}
      />
  )
}

export default React.memo(SwitchButton)
