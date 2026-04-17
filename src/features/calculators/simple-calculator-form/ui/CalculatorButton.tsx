import React from 'react'
import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

interface CalculatorButtonProps {
  label: string
  onClick: () => void
  textClass?: string
  containerClass?: string
  colSpan?: number
  size: number
}

export const CalculatorButton = ({
  label,
  onClick,
  textClass,
  containerClass,
  colSpan = 1,
  size,
}: CalculatorButtonProps) => {
  const isWide = colSpan === 2
  const gap = 12

  const buttonStyle: ViewStyle = {
    height: size,
    width: isWide ? size * 2 + gap : size,
    ...(isWide ? { paddingLeft: size * 0.4, alignItems: 'flex-start' } : { alignItems: 'center' }),
  }

  const handlePress = () => {
    ReactNativeHapticFeedback.trigger('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    })
    onClick()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`justify-center rounded-full border-slate-200 shadow-sm shadow-slate-200 ${containerClass}`}
      style={buttonStyle}
    >
      <Text className={textClass}>{label}</Text>
    </TouchableOpacity>
  )
}
