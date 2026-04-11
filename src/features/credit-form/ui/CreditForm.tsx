// src/features/credit-form/ui/CreditForm.tsx
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { CreditFormValues } from '@/entities/credit'

interface CreditFormProps {
  control: Control<CreditFormValues>
}

export const CreditForm = ({ control }: CreditFormProps) => {
  return (
    <View>
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
              <View className="flex-row gap-2 rounded-xl bg-slate-100 p-1">
                {(['annuity', 'differentiated'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => onChange(type)}
                    className={`flex-1 items-center rounded-lg py-2 ${
                      value === type ? 'bg-white shadow-sm' : ''
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${value === type ? 'text-blue-600' : 'text-slate-500'}`}
                    >
                      {type === 'annuity' ? 'Аннуитет' : 'Дифф.'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}
