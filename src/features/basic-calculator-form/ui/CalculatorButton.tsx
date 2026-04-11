import { CalculatorButtons } from '@/entities/calculator'
import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

export const CalculatorButton = ({
  label,
  onClick,
  textClass,
  containerClass,
  colSpan = 1,
  size,
}: CalculatorButtons) => {
  const isWide = colSpan === 2

  const buttonStyle: ViewStyle = {
    height: size,
    width: isWide ? size * 2 + 16 : size,
    ...(isWide ? { paddingLeft: 30, alignItems: 'flex-start' } : {}),
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
      activeOpacity={0.6}
      className={`justify-center rounded-full ${containerClass} ${isWide ? '' : 'items-center'}`}
      style={buttonStyle}
    >
      <Text className={`text-3xl font-medium ${textClass}`}>{label}</Text>
    </TouchableOpacity>
  )
}
