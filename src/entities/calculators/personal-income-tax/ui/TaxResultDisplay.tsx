// src/entities/personal-income-tax/ui/tax-result-display.tsx
import React from 'react'
import { View, Text } from 'react-native'

interface TaxResult {
  results: {
    totalGross: number
    taxAmount: number
    netIncome: number
    effectiveRate: number
  } | null
}

export const TaxResultDisplay = ({ results }: TaxResult) => {
  if (!results || results.totalGross === 0) return null

  const format = (val: number) => new Intl.NumberFormat('ru-RU').format(val) + ' ₽'

  return (
    <View className="mt-8 rounded-3xl border border-blue-100 bg-blue-50/50 p-6">
      <View className="mb-6 flex-row items-end justify-between">
        <View>
          <Text className="mb-1 text-xs font-bold uppercase text-blue-400">Чистыми (на руки)</Text>
          <Text className="text-3xl font-black text-blue-900">{format(results.netIncome)}</Text>
        </View>
        <View className="rounded-full bg-blue-600 px-3 py-1">
          <Text className="text-xs font-bold text-white">{results.effectiveRate.toFixed(1)}%</Text>
        </View>
      </View>

      <View className="mb-4 h-[1px] bg-blue-100" />

      <View className="gap-3">
        <View className="flex-row justify-between">
          <Text className="text-slate-500">Налог к уплате:</Text>
          <Text className="font-bold text-red-500">{format(results.taxAmount)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-slate-500">Общий доход (грязными):</Text>
          <Text className="font-bold text-slate-700">{format(results.totalGross)}</Text>
        </View>
      </View>
    </View>
  )
}
