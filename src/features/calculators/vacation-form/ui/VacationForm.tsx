import { Text, View, TouchableOpacity } from 'react-native'
import { Info, Plus, X } from 'lucide-react-native'
import { ControlledDateInput } from '@/shared/ui/controlled-data'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { VacationFormInput } from '@/entities/calculators/vacation-form'
import { Control, FieldArrayWithId, UseFieldArrayRemove } from 'react-hook-form'
import React from 'react'
import { ControlledTextInput } from '@/shared/ui/controlled-text-input'

interface VacationFormProps {
  control: Control<VacationFormInput>
  // Типизируем массив полей из нашей схемы
  fields: FieldArrayWithId<VacationFormInput, 'excludedPeriods', 'id'>[]
  addPeriod: () => void
  removePeriod: UseFieldArrayRemove
  showInfo: (title: string, text: string) => void
}
export const VacationForm = ({
  showInfo,
  control,
  fields,
  addPeriod,
  removePeriod,
}: VacationFormProps) => {
  return (
    <>
      <View className="flex-col gap-4">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Стаж работы
        </Text>
        <ControlledDateInput name="hiringDate" control={control} label="Дата приема на работу" />
        <ControlledDateInput name="calculationDate" control={control} label="Расчетная дата" />

        <View className="my-2 h-[1px] bg-slate-100" />

        <View>
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-sm font-semibold text-slate-700">Исключаемые периоды</Text>
              <TouchableOpacity onPress={() => showInfo('Исключение', '...')}>
                <Info size={16} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={addPeriod}
              className="flex-row items-center gap-1 rounded-lg bg-blue-50 px-3 py-2"
            >
              <Plus size={14} color="#3b82f6" strokeWidth={3} />
              <Text className="text-xs font-bold uppercase text-blue-600">Добавить</Text>
            </TouchableOpacity>
          </View>

          {fields.map((field, index) => (
            <View
              key={field.id}
              className="mb-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-3"
            >
              <View className="mb-2 flex-row items-center justify-between">
                <Text className="text-[10px] font-bold uppercase text-slate-400">
                  Период #{index + 1}
                </Text>
                <TouchableOpacity onPress={() => removePeriod(index)}>
                  <X size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-2">
                <View className="flex-1">
                  <ControlledDateInput
                    name={`excludedPeriods.${index}.startDate`}
                    control={control}
                    label="С"
                  />
                </View>
                <View className="flex-1">
                  <ControlledDateInput
                    name={`excludedPeriods.${index}.endDate`}
                    control={control}
                    label="По"
                  />
                </View>
              </View>

              <View className="mt-2">
                <ControlledTextInput
                  name={`excludedPeriods.${index}.comment`}
                  control={control}
                  placeholder="Комментарий (прогул, отпуск за свой счет и т.д.)"
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="mb-6 gap-4 rounded-3xl bg-white shadow-sm">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Параметры отпуска
        </Text>

        <View>
          <View className="mb-2 flex-row items-center gap-2">
            <Text className="text-sm font-medium text-slate-700">
              Продолжительность ежегодного оплачиваемого отпуска
            </Text>
            <TouchableOpacity
              onPress={() =>
                showInfo(
                  'Продолжительность',
                  'Стандарт – 28 дней. Инвалиды – 30, несовершеннолетние – 31, вредные условия – от 35, Крайний Север – 52.'
                )
              }
            >
              <Info size={18} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <ControlledNumberInput
            name="annualVacationDays"
            control={control}
            isFormatted
            label=""
            limit={11000000}
          />
        </View>

        <ControlledNumberInput
          name="usedDays"
          control={control}
          label="Уже использовано дней"
          limit={11000000}
        />
      </View>

      <View className="mb-10 gap-4 rounded-3xl bg-white shadow-sm">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">Выплаты</Text>
        <ControlledNumberInput
          name="averageEarnings"
          control={control}
          label="Средний дневной заработок (₽)"
          isFormatted
          limit={11000000}
        />
      </View>
    </>
  )
}
