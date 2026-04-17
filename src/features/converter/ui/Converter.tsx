import React from 'react'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { CATEGORIES, CATEGORY_LABELS } from '@/entities/converters/converter'
import {
  CategoryType,
  ConverterFormInput,
  ConverterFormOutput,
  UnitDefinition,
  UnitId,
} from '@/entities/converters/converter/model/schema'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { Control } from 'react-hook-form'

interface ConverterProps {
  category: CategoryType
  fromUnit: UnitId
  control: Control<ConverterFormInput>
  updateField: (patch: Partial<ConverterFormOutput>) => void
  setIsUnitSelectorOpen: (value: boolean) => void
  availableUnits: UnitDefinition[]
}
export const Converter = ({
  category,
  updateField,
  setIsUnitSelectorOpen,
  availableUnits,
  fromUnit,
  control,
}: ConverterProps) => {
  return (
    <>
      <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Категория
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 flex-row">
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => updateField({ category: cat as CategoryType })}
            className={`mr-2 rounded-full px-5 py-2 ${
              category === cat ? 'bg-blue-600' : 'border border-slate-200 bg-white'
            }`}
          >
            <Text
              className={`capitalize ${category === cat ? 'font-bold text-white' : 'text-slate-600'}`}
            >
              {CATEGORY_LABELS[cat]}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <Text className="mb-2 text-xs font-bold uppercase text-slate-400">Введите величину</Text>
        <View className="flex-row items-end justify-between">
          <View className="flex-1">
            <ControlledNumberInput
              name="inputValue"
              control={control}
              label="Значение"
              isFormatted={true}
              limit={1000000000}
            />
          </View>
          <Pressable
            onPress={() => setIsUnitSelectorOpen(true)}
            className="ml-4 h-12 w-32 flex-row items-center justify-center rounded-xl border border-slate-200 bg-slate-50 active:bg-slate-100"
          >
            <Text className="mr-2 text-base font-bold text-blue-600">
              {availableUnits.find((u) => u.id === fromUnit)?.shortLabel || ''}
            </Text>
            <Text className="text-[10px] text-blue-400">▼</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}
