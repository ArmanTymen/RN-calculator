import React from 'react'
import { View, Text } from 'react-native'

interface PercentResultProps {
  result: number | null
  suffix?: string
  decimals: number
}

export const PercentResult = ({ result, suffix, decimals }: PercentResultProps) => {
  const formatResult = (val: number | null): string => {
    if (val === null) return '—'

    return new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0,
    }).format(val)
  }

  return (
    <View className="mt-4 flex-col items-center justify-center rounded-2xl bg-blue-50 py-6">
      <Text className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-600">
        Результат
      </Text>

      <View className="flex-row items-baseline px-4">
        <Text numberOfLines={1} adjustsFontSizeToFit className="text-4xl font-bold text-slate-900">
          {formatResult(result)}
          {result !== null && suffix && (
            <Text className="text-4xl font-semibold text-slate-900">{suffix}</Text>
          )}
        </Text>
      </View>
    </View>
  )
}
