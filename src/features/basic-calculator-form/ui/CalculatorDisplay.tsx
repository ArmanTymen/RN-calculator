import { View, Text } from 'react-native'

interface CalculatorDisplayProps {
  equation: string
  display: string
}

export const CalculatorDisplay = ({ equation, display }: CalculatorDisplayProps) => {
  const displayValue = display.replace('.', ',')

  return (
    <View className="flex-1 justify-end px-8 pb-6">
      <Text numberOfLines={1} className="mb-2 text-right text-3xl font-medium text-[#FF9F0A]">
        {equation}
      </Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        className="text-right text-7xl font-light tracking-tight text-white"
      >
        {displayValue}
      </Text>
    </View>
  )
}
