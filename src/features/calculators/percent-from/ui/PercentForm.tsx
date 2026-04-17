import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Control, Controller } from 'react-hook-form'
import { PERCENT_OPERATIONS } from '@/entities/calculators/percent/lib/percent-logic'
import { Text, View } from 'react-native'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { PercentFormInput } from '@/entities/calculators/percent'
import { TheoryHint } from '@/entities/calculators/percent/ui/TheoryHint'
import { OperationConfig } from '@/entities/calculators/percent/model/types'

interface PercentFormProps {
  control: Control<PercentFormInput>
  currentConfig: OperationConfig
}
export const PercentForm = ({ control, currentConfig }: PercentFormProps) => {
  return (
    <View className="flex-col gap-5">
      <View className="flex-col gap-2">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Тип расчета
        </Text>
        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <Controller
            control={control}
            name="operationType"
            render={({ field: { onChange, value } }) => (
              <Picker selectedValue={value} onValueChange={onChange}>
                {Object.entries(PERCENT_OPERATIONS).map(([key, config]) => (
                  <Picker.Item key={key} label={config.title} value={key} />
                ))}
              </Picker>
            )}
          />
        </View>
      </View>

      {/* Вызов компонента справки */}
      <TheoryHint config={currentConfig} />

      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="val1"
          control={control}
          label={currentConfig.label1}
          isFormatted
          limit={50000000}
        />

        <ControlledNumberInput
          name="val2"
          control={control}
          label={currentConfig.label2}
          isFormatted
          limit={50000000}
        />

        <ControlledNumberInput
          name="decimals"
          control={control}
          label="Знаков после запятой"
          limit={10}
        />
      </View>
    </View>
  )
}
