import { ScheduleRow } from '@/entities/credit/model/types'
import React from 'react'
import { Text, View } from 'react-native'

const moneyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

const formatMoney = (val: number): string => moneyFormatter.format(val)

export const ScheduleRowComponent = React.memo(({ item }: { item: ScheduleRow }) => {
  return (
    <View className="flex-row border-b border-slate-50 py-3">
      <Text className="flex-1 text-center text-xs font-medium text-slate-700">{item.date}</Text>
      <Text className="flex-1 text-right text-xs font-bold text-slate-900">
        {formatMoney(item.payment)}
      </Text>
      <Text className="flex-1 text-right text-xs text-orange-500">
        {formatMoney(item.interest)}
      </Text>
      <Text className="flex-[1.2] text-right text-xs text-slate-400">
        {formatMoney(item.balance)}
      </Text>
    </View>
  )
})
