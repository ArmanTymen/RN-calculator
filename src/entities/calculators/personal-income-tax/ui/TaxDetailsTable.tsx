import React from 'react'
import { View, Text } from 'react-native'
import { TaxBracket } from '../model/calculate-tax'

export const TaxDetailsTable = ({
  brackets,
  taxableBase,
}: {
  brackets: TaxBracket[]
  taxableBase: number
}) => {
  const format = (v: number) => new Intl.NumberFormat('ru-RU').format(Math.round(v)) + ' ₽'

  return (
    <View className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Text className="mb-3 text-xs font-bold uppercase text-slate-400">
        Налоговая база: {format(taxableBase)}
      </Text>

      <View className="mb-2 flex-row border-b border-slate-200 pb-2">
        <Text className="flex-1 text-[10px] font-bold text-slate-500">Ставка</Text>
        <Text className="flex-1 text-right text-[10px] font-bold text-slate-500">Доход</Text>
        <Text className="flex-1 text-right text-[10px] font-bold text-slate-500">Налог</Text>
      </View>

      {brackets.map((b, i) => (
        <View key={i} className="flex-row py-1">
          <Text className="flex-1 text-xs font-bold text-slate-700">{b.rate}%</Text>
          <Text className="flex-1 text-right text-xs text-slate-600">
            {format(b.taxableAmount)}
          </Text>
          <Text className="flex-1 text-right text-xs font-bold text-slate-900">
            {format(b.tax)}
          </Text>
        </View>
      ))}
    </View>
  )
}
