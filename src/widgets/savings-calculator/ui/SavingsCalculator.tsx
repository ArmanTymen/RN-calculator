// widgets/savings-calculator/ui/SavingsCalculator.tsx
import React from 'react'
import { ScrollView, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { SavingsForm } from '@/features/savings-form'
import { SavingsFormValues } from '@/entities/savings/model/types'

export const SavingsCalculator = () => {
  const { control } = useForm<SavingsFormValues>({
    defaultValues: {
      depositAmount: 0,
      currency: 'RUB',
      duration: 0,
      durationUnit: 'months',
      interestRateType: 'fixed',
      interestRate: 0,
      isCapitalization: false,
      payoutFrequency: 'monthly',
      limit: 0,
    },
  })

  return (
    <ScrollView
      className="bg-slate-50 p-4"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-200">
        <SavingsForm control={control} />
      </View>
    </ScrollView>
  )
}
