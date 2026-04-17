// src/features/calculators/simple-calculator-form/ui/CalculatorDisplay.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface CalculatorDisplayProps {
  equation: string
  display: string
}

export const CalculatorDisplay = ({ equation, display }: CalculatorDisplayProps) => {
  const displayValue = display.replace('.', ',')

  return (
    <View className="shadow-inner mb-2 min-h-[140px] justify-end rounded-3xl border border-blue-100 bg-blue-50/80 px-6 py-4">
      <Text
        numberOfLines={1}
        className="mb-1 text-right text-lg font-medium text-blue-500 opacity-80"
      >
        {equation || ' '}
      </Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        className="text-right text-6xl font-bold tracking-tighter text-slate-900"
      >
        {displayValue}
      </Text>
    </View>
  )
}
