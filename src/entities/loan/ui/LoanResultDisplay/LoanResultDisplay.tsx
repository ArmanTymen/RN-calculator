import React from 'react'
import { View, Text } from 'react-native'
import { RefreshCcw } from 'lucide-react-native'
import { ScheduleRow } from '@/entities/credit'

interface Props {
  scheduleData: ScheduleRow[]
  paymentType?: 'annuity' | 'differentiated'
  isRefinanceEnabled?: boolean
}

export const LoanResultDisplay = ({
  scheduleData,
  paymentType = 'annuity',
  isRefinanceEnabled = false,
}: Props) => {
  const hasData = scheduleData.length > 0
  const totalOverpayment = hasData ? scheduleData.reduce((sum, row) => sum + row.interest, 0) : 0
  const firstPayment = hasData ? scheduleData[0].payment : 0
  const lastPayment = hasData ? scheduleData[scheduleData.length - 1]?.payment || 0 : 0

  const isDiff = paymentType === 'differentiated'
  const formatMoney = (val: number) => Math.round(val).toLocaleString('ru-RU') + ' ₽'

  const containerBg = isRefinanceEnabled ? 'bg-blue-50' : 'bg-green-50'
  const accentColor = isRefinanceEnabled ? 'text-blue-700' : 'text-green-700'
  const borderColor = isRefinanceEnabled ? 'border-blue-200' : 'border-green-200'

  return (
    <View
      className={`mt-6 flex-col gap-2 rounded-2xl p-6 ${
        hasData
          ? `${containerBg} border ${borderColor}`
          : 'border border-dashed border-slate-200 bg-slate-50'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <Text className={`text-sm font-medium ${hasData ? accentColor : 'text-slate-400'}`}>
          {isDiff ? 'Платеж (от первого к последнему)' : 'Ежемесячный платеж'}
        </Text>

        {/* Бейдж рефинансирования */}
        {hasData && isRefinanceEnabled && (
          <View className="flex-row items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5">
            <RefreshCcw size={10} color="#1d4ed8" />
            <Text className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Рефинанс
            </Text>
          </View>
        )}
      </View>

      <View style={{ minHeight: 40 }} className="justify-center">
        {isDiff ? (
          <View className="flex-col">
            <Text className={`text-2xl font-bold ${hasData ? 'text-slate-900' : 'text-slate-300'}`}>
              {formatMoney(firstPayment)}
            </Text>
            <Text
              className={`text-sm font-medium opacity-50 ${hasData ? 'text-slate-900' : 'text-slate-300'}`}
            >
              до {formatMoney(lastPayment)}
            </Text>
          </View>
        ) : (
          <Text className={`text-4xl font-bold ${hasData ? 'text-slate-900' : 'text-slate-300'}`}>
            {formatMoney(firstPayment)}
          </Text>
        )}
      </View>

      <View
        className={`mt-2 flex-row justify-between border-t pt-4 ${
          hasData
            ? isRefinanceEnabled
              ? 'border-blue-100'
              : 'border-green-200'
            : 'border-slate-200'
        }`}
      >
        <View className="flex-col">
          <Text
            className={`text-xs uppercase tracking-tighter ${hasData ? 'text-slate-500' : 'text-slate-400'}`}
          >
            Переплата за весь срок
          </Text>
          <Text className={`text-lg font-bold ${hasData ? 'text-slate-900' : 'text-slate-300'}`}>
            {formatMoney(totalOverpayment)}
          </Text>
        </View>

        {hasData && isRefinanceEnabled && (
          <View className="justify-end">
            <Text className="text-[10px] italic text-blue-500">ставка изменится</Text>
          </View>
        )}
      </View>
    </View>
  )
}
