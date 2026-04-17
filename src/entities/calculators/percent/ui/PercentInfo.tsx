import React from 'react'
import { View, Text } from 'react-native'
import { OperationConfig } from '../model/types'

interface PercentInfoProps {
  config: OperationConfig
}

export const PercentInfo = ({ config }: PercentInfoProps) => {
  return (
    <View className="mt-8 flex-col gap-4 border-t border-slate-100 pt-6">
      <Text className="text-lg font-bold text-slate-900">{config.title}</Text>
      <Text className="text-sm leading-5 text-slate-600">{config.description}</Text>

      <View className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Формула расчета
        </Text>
        <Text className="font-mono text-sm text-slate-800">{config.formula}</Text>
      </View>
    </View>
  )
}
