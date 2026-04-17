import React from 'react'
import { ScrollView, View } from 'react-native'
import { usePercentForm } from '@/features/calculators/percent-from/model/usePercentForm'
import { PercentForm } from '@/features/calculators/percent-from/ui/PercentForm'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormProvider } from 'react-hook-form'
import { PercentInfo, PercentResult } from '@/entities/calculators/percent'

export const PercentCalculator = () => {
  const methods = usePercentForm()
  const { control, result, currentConfig, decimals } = usePercentForm()

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FormProvider {...methods}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-col gap-5">
            <PercentForm control={control} currentConfig={currentConfig} />
            <PercentResult
              result={result}
              suffix={currentConfig.resultSuffix}
              decimals={decimals}
            />
          </View>

          <PercentInfo config={currentConfig} />
        </ScrollView>
      </FormProvider>
    </SafeAreaView>
  )
}
