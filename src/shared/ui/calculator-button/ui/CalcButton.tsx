import { Text, Pressable } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { CalcButtonProps, VARIANTS } from '../model/types'
import { hapticOptions } from '../model/constants'

export const CalcButton = ({
  label,
  onPress,
  variant = 'number',
  className = '',
}: CalcButtonProps) => {
  const config = VARIANTS[variant]

  const handlePress = () => {
    ReactNativeHapticFeedback.trigger(config.haptic, hapticOptions)
    onPress()
  }

  return (
    <Pressable
      onPress={handlePress}
      className={`flex select-none items-center justify-center rounded-full ${config.container} ${className}`}
    >
      <Text className={`text-2xl font-medium ${config.text}`}>{label}</Text>
    </Pressable>
  )
}
