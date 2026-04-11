// widgets/percent-calculator/ui/PercentCalculator.tsx
import React from 'react'
import { ScrollView, View } from 'react-native'
import { usePercentForm } from '@/features/percent-from/model/usePercentForm'
import { PercentHistory, PercentInfo, PercentResult } from '@/features/percent-from'
import { PercentForm } from '@/features/percent-from/ui/PercentForm'

export const PercentCalculator = () => {
  const { control, result, currentConfig, decimals } = usePercentForm()

  return (
    <ScrollView>
      <View className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200">
        <PercentHistory />
        <View className="flex-col gap-5">
          <PercentForm control={control} currentConfig={currentConfig} />
          <PercentResult result={result} suffix={currentConfig.resultSuffix} decimals={decimals} />
        </View>

        <PercentInfo config={currentConfig} />
      </View>
    </ScrollView>
  )
}
