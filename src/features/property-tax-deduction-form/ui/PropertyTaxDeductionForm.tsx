import React from 'react'
import { View, Text, Switch, ScrollView, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { usePropertyTaxForm } from '../model/usePropertyTaxForm'
import { ResultRow } from './ResultRow'

export const PropertyTaxDeductionForm = () => {
  const { control, setValue, fields, results, isHydrated, watch, handleYearChange } =
    usePropertyTaxForm()

  const purchaseYear = watch('purchaseYear')
  const isPreviouslyUsed = watch('isPreviouslyUsed')

  if (!isHydrated) return <ActivityIndicator className="mt-10" />

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => (currentYear - i).toString())

  return (
    <ScrollView className="flex-1 bg-slate-50 px-4 py-6">
      <View className="mb-6 gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <ControlledNumberInput
          name="propertyValue"
          control={control}
          label="Стоимость квартиры (₽)"
          isFormatted
          limit={50000000}
        />

        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-700">Год покупки</Text>
          <View className="rounded-xl border border-slate-200 bg-slate-50">
            <Picker
              selectedValue={purchaseYear}
              onValueChange={(value) => {
                if (typeof value === 'string') {
                  handleYearChange(value)
                }
              }}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {fields.length > 0 && (
        <View className="mb-6 gap-4 rounded-3xl bg-white p-5 shadow-sm">
          <Text className="text-xs font-bold uppercase text-slate-400">Официальный доход</Text>
          {fields.map((field, index) => (
            <ControlledNumberInput
              key={field.id}
              name={`yearlyIncomes.${index}.value`}
              control={control}
              label={`За ${field.year} год (₽)`}
              isFormatted
              limit={50000000}
            />
          ))}
        </View>
      )}

      {fields.length === 0 && (
        <View className="mb-6 rounded-3xl bg-amber-50 p-5">
          <Text className="text-center text-amber-700">Вычет за этот год еще недоступен.</Text>
        </View>
      )}

      <View className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 text-sm font-medium">Ранее пользовались вычетом?</Text>
          <Switch
            value={isPreviouslyUsed}
            onValueChange={(val) => setValue('isPreviouslyUsed', val)}
          />
        </View>

        {isPreviouslyUsed && (
          <View className="mt-4 gap-3 border-t border-slate-100 pt-4">
            <ControlledNumberInput
              name="alreadyReceivedAmount"
              control={control}
              label="Ранее полученная сумма"
              isFormatted
              limit={260000}
            />
          </View>
        )}
      </View>

      {results?.shouldShowResults && (
        <View className="mb-10 gap-3 rounded-3xl bg-slate-100 p-5">
          <ResultRow label="Доступный вычет:" value={results.availableBase} />
          <ResultRow label="Налог к возврату:" value={results.totalTaxReturn} />
          <View className="my-1 h-[1px] bg-slate-200" />
          <ResultRow label="Доступно сейчас:" value={results.availableNow} />
        </View>
      )}
    </ScrollView>
  )
}
