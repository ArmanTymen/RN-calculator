// src/features/credit-form/ui/CreditForm.tsx
import React from 'react'
import { View, Text } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { CreditFormValues } from '@/entities/calculators/credit'
import { SegmentedControl } from '@/shared/ui/segmented-control'

interface CreditFormProps {
  control: Control<CreditFormValues>
}

export const CreditForm = ({ control }: CreditFormProps) => {
  return (
    <>
      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="amount"
          control={control}
          label="Сумма (₽)"
          isFormatted
          limit={50000000}
        />

        <View className="flex-row gap-4">
          <View className="flex-1">
            <ControlledNumberInput
              name="annualRate"
              control={control}
              label="Ставка (%)"
              limit={50}
            />
          </View>
          <View className="flex-1">
            <ControlledNumberInput name="months" control={control} label="Срок (мес)" limit={600} />
          </View>
        </View>

        <View className="mt-2">
          <Text className="mb-2 text-sm text-slate-500">Тип платежа</Text>
          <Controller
            control={control}
            name="paymentType"
            render={({ field: { onChange, value } }) => (
              <SegmentedControl
                value={value}
                onChange={onChange}
                options={[
                  { label: 'Аннуитет', value: 'annuity' },
                  { label: 'Дифф.', value: 'differentiated' },
                ]}
              />
            )}
          />
        </View>
      </View>
    </>
  )
}
