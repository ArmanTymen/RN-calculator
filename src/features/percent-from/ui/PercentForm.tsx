import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Control, Controller } from 'react-hook-form'
import { PERCENT_OPERATIONS } from '@/entities/percent/lib/percent-logic'
import { Text, View } from 'react-native'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { OperationConfig, PercentFormInput } from '@/entities/percent'

interface PercentFormProps {
  control: Control<PercentFormInput>
  currentConfig: OperationConfig
}
export const PercentForm = ({ control, currentConfig }: PercentFormProps) => {
  return (
    <>
      <View className="flex-col gap-1">
        <Text className="text-sm font-medium text-slate-500">Тип расчета</Text>
        <View className="overflow-hidden rounded-xl border border-slate-300 bg-slate-50">
          <Controller
            control={control}
            name="operationType"
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange} mode="dropdown">
                {Object.entries(PERCENT_OPERATIONS).map(([key, config]) => (
                  <Picker.Item key={key} label={config.title} value={key} />
                ))}
              </Picker>
            )}
          />
        </View>
      </View>

      <ControlledNumberInput
        name="val1"
        control={control}
        label={currentConfig.label1}
        limit={999999999}
        isFormatted
      />

      <ControlledNumberInput
        name="val2"
        control={control}
        label={currentConfig.label2}
        limit={999999999}
        isFormatted
      />

      <ControlledNumberInput
        name="decimals"
        control={control}
        label="Округлять знаков после запятой"
        limit={10}
        keyboardType="numeric"
      />
    </>
  )
}
