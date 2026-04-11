import React from 'react'
import { Text, View } from 'react-native'

export const ResultRow = ({
  label,
  value,
  isHighlight = false,
}: {
  label: string
  value: number | undefined | null
  isHighlight?: boolean
}) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0

  const sign = safeValue < 0 ? '-' : ''
  const absoluteValue = Math.abs(safeValue)
  const absoluteFormatted = absoluteValue.toLocaleString('ru-RU')

  return (
    <View className="flex-row items-center justify-between border-b border-blue-200/50 pb-2">
      <Text className="flex-1 pr-4 text-sm text-slate-600">{label}</Text>
      <Text
        className={`font-bold ${
          isHighlight ? 'text-xl text-blue-700' : 'text-base text-slate-900'
        }`}
      >
        {sign}
        {absoluteFormatted} ₽
      </Text>
    </View>
  )
}
