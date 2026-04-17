import React from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { Controller, Control, UseFormSetValue } from 'react-hook-form'
import {
  PersonalTaxIncomeFormInput,
  IncomeType,
  IncomeMode,
} from '@/entities/calculators/personal-income-tax'
import {
  INCOME_MODES,
  INCOME_TYPES,
} from '@/entities/calculators/personal-income-tax/model/tax-constants'

interface Props {
  control: Control<PersonalTaxIncomeFormInput>
  setValue: UseFormSetValue<PersonalTaxIncomeFormInput>
  handleReset: () => void
  values: {
    incomeType: IncomeType
    incomeMode: IncomeMode
    isNonResident: boolean
    isSpecialCategory: boolean
    hasDistrictCoefficient: boolean
  }
}

export const PersonalTaxIncomeForm = ({ control, setValue, handleReset, values }: Props) => {
  const showDeductionField = values.incomeType !== 'dividends' && !values.isNonResident

  return (
    <View className="flex-col gap-6">
      {/* Вид дохода */}
      <View className="gap-2">
        <Text className="text-sm font-medium text-slate-500">Вид дохода</Text>
        <View className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <Picker
            selectedValue={values.incomeType}
            onValueChange={(val) => setValue('incomeType', val as IncomeType)}
            style={{ marginLeft: -8 }} // Компенсация внутреннего отступа нативного пикера
          >
            {Object.entries(INCOME_TYPES).map(([key, config]) => (
              <Picker.Item key={key} label={config.label} value={key} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Сумма и Режим налога */}
      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="income"
          control={control}
          label="Сумма дохода (₽)"
          isFormatted
          limit={1000000000}
        />

        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-500">Указать сумму</Text>
          <View className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Controller
              control={control}
              name="incomeMode"
              render={({ field: { onChange, value } }) => (
                <Picker selectedValue={value} onValueChange={onChange} style={{ marginLeft: -8 }}>
                  {INCOME_MODES.map((mode) => (
                    <Picker.Item key={mode.value} label={mode.label} value={mode.value} />
                  ))}
                </Picker>
              )}
            />
          </View>
        </View>

        {showDeductionField && (
          <ControlledNumberInput
            name="taxDeduction"
            control={control}
            label="Налоговый вычет (₽)"
            isFormatted
            limit={500000}
          />
        )}
      </View>

      <View className="h-[1px] bg-slate-100" />

      {/* Настройки резидентства и коэффициентов */}
      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-sm font-medium text-slate-700">Нерезидент</Text>
            <Text className="text-[11px] text-slate-400">В РФ менее 183 дней в году</Text>
          </View>
          <Switch
            value={values.isNonResident}
            onValueChange={(val) => {
              setValue('isNonResident', val)
              if (!val) setValue('isSpecialCategory', false)
            }}
          />
        </View>

        {values.isNonResident && (
          <View className="ml-2 gap-3 border-l-2 border-blue-100 pl-4">
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 text-xs text-slate-500">Льготная категория</Text>
              <Switch
                value={values.isSpecialCategory}
                onValueChange={(val) => setValue('isSpecialCategory', val)}
              />
            </View>
          </View>
        )}

        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-slate-700">Районный коэффициент</Text>
          <Switch
            value={values.hasDistrictCoefficient}
            onValueChange={(val) => setValue('hasDistrictCoefficient', val)}
          />
        </View>
      </View>

      {values.hasDistrictCoefficient && (
        <View className="gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <ControlledNumberInput
                limit={500000}
                name="districtCoefficient"
                control={control}
                label="РК"
              />
            </View>
            <View className="flex-1">
              <ControlledNumberInput
                limit={500000}
                name="northernBonus"
                control={control}
                label="Северные (%)"
              />
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity onPress={handleReset} className="items-center py-4">
        <Text className="text-sm font-bold text-red-400">Очистить данные</Text>
      </TouchableOpacity>
    </View>
  )
}
