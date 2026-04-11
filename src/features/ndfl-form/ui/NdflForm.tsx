import React from 'react'
import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { NdflFormValues } from '@/entities/tax'
import { useNdflForm } from '../model/useNdflForm'

export const NdflForm = () => {
  const {
    isNonResident,
    hasDistrictCoefficient,
    incomeMode,
    incomeType,
    isSpecialCategory,
    handleReset,
    setValue,
    control,
  } = useNdflForm()
  return (
    <ScrollView
      className="rounded-2xl bg-white p-6 shadow-md"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-col gap-5">
        {/* Вид дохода */}
        <View className="gap-2">
          <Text className="text-sm font-medium text-slate-500">Вид дохода</Text>
          <View className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Picker
              selectedValue={incomeType}
              onValueChange={(val) => setValue('incomeType', val)}
              style={{ marginLeft: -8 }} // Компенсация нативных отступов Picker
            >
              <Picker.Item label="Заработная плата" value="salary" />
              <Picker.Item label="Дивиденды" value="dividends" />
              <Picker.Item label="Продажа имущества" value="property_sale" />
            </Picker>
          </View>
        </View>

        {/* Сумма дохода + Режим */}
        <View className="flex-row gap-3">
          <View className="flex-[2]">
            <ControlledNumberInput<NdflFormValues>
              name="income"
              control={control}
              label="Доход (₽)"
              isFormatted
              limit={5000000}
            />
          </View>
          <View className="flex-[1.5] justify-end">
            <View className="h-[56px] justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <Picker
                selectedValue={incomeMode}
                onValueChange={(val) => setValue('incomeMode', val)}
                style={{ marginLeft: -8 }}
              >
                <Picker.Item label="до вычета" value="gross" />
                <Picker.Item label="на руки" value="net" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Налоговый вычет */}
        <ControlledNumberInput<NdflFormValues>
          name="taxDeduction"
          control={control}
          label="Налоговый вычет (₽)"
          isFormatted
          limit={5000000}
        />

        <View className="my-2 h-[1px] bg-slate-100" />

        {/* Чекбоксы в стиле Списка */}
        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-sm text-slate-600">Нерезидент</Text>
            <Switch
              value={isNonResident}
              onValueChange={(val) => setValue('isNonResident', val)}
              trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
            />
          </View>

          {isNonResident && (
            <View className="ml-4 gap-3 border-l-2 border-blue-50 pl-4">
              <View className="flex-row items-center justify-between">
                <Text className="flex-1 text-xs text-slate-500">
                  Льготная категория (ВКС, беженцы)
                </Text>
                <Switch
                  value={isSpecialCategory}
                  onValueChange={(val) => setValue('isSpecialCategory', val)}
                />
              </View>
            </View>
          )}

          <View className="flex-row items-center justify-between">
            <Text className="flex-1 text-sm text-slate-600">Районный коэффициент / Северные</Text>
            <Switch
              value={hasDistrictCoefficient}
              onValueChange={(val) => setValue('hasDistrictCoefficient', val)}
              trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
            />
          </View>
        </View>

        {/* Секция коэффициентов */}
        {hasDistrictCoefficient && (
          <View className="mt-2 gap-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
            <Text className="text-[11px] leading-4 text-amber-700">
              Для корректного расчета доход должен быть указан без учета РК и северных надбавок.
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <ControlledNumberInput<NdflFormValues>
                  name="districtCoefficient"
                  control={control}
                  label="Коэффициент"
                  limit={3}
                />
              </View>
              <View className="flex-1">
                <ControlledNumberInput<NdflFormValues>
                  name="northernBonus"
                  control={control}
                  label="Надбавка (%)"
                  limit={100}
                />
              </View>
            </View>
          </View>
        )}

        {/* Кнопка сброса как в Кредитах */}
        <TouchableOpacity onPress={handleReset} className="mt-8 items-center justify-center py-2">
          <Text className="text-sm font-semibold text-red-500 opacity-80">Сбросить расчеты</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
