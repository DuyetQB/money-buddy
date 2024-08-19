import { View,ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from './styles'

interface ILoadingIconProps {
  color?: string,
  size?:number
}

const LoadingIcon = ({ color = 'blue',size=20 }: ILoadingIconProps) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.iconLoading}>
        <ActivityIndicator size={size} color={color} />
      </View>
    </View>
  )
}

export default LoadingIcon
