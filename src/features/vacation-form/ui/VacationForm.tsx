import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useForm } from 'react-hook-form'
import { VacationFormSchema } from '@/entities/vacation-form'
import { Info } from 'lucide-react-native'
import { InfoModal } from '@/shared/ui/info-modal'
import { ControlledDateInput } from '@/shared/ui/controlled-data'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'

export const VacationForm = () => {
  const { control } = useForm<VacationFormSchema>({
    defaultValues: {
      annualVacationDays: 28,
      excludedDays: 0,
      hiringDate: new Date(),
      calculationDate: new Date(),
    },
  })

  const [infoContent, setInfoContent] = useState<{ title: string; text: string } | null>(null)

  const showInfo = (title: string, text: string) => {
    setInfoContent({ title, text })
  }
  return (
    <View>
      <View className="mb-6 gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Стаж работы
        </Text>

        <ControlledDateInput
          name="hiringDate"
          control={control}
          placeholder="Дата приема на работу"
          label="Дата приема на работу"
        />

        <ControlledDateInput
          name="calculationDate"
          control={control}
          placeholder="Расчетная дата"
          label="Расчетная дата"
        />

        <View>
          <View className="mb-2 flex-row items-center gap-2">
            <Text className="text-sm font-medium text-slate-700">Исключаемые периоды (дней)</Text>
            <Text>
              Тут надо подумать как лучше это сделать, слишком жирным получается модалка...
            </Text>
            <TouchableOpacity
              onPress={() =>
                showInfo(
                  'Исключаемые периоды',
                  'В стаж не включаются: прогулы, отпуска по уходу за ребенком, отпуска за свой счет свыше 14 дней в году.'
                )
              }
            >
              <Info size={18} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <ControlledNumberInput name="excludedDays" control={control} label="" limit={11000000} />
        </View>
      </View>

      <View className="mb-6 gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Параметры отпуска
        </Text>

        <View>
          <View className="mb-2 flex-row items-center gap-2">
            <Text className="text-sm font-medium text-slate-700">Дней отпуска в год</Text>
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

      <View className="mb-10 gap-4 rounded-3xl bg-white p-5 shadow-sm">
        <Text className="text-xs font-bold uppercase tracking-widest text-slate-400">Выплаты</Text>
        <ControlledNumberInput
          name="averageEarnings"
          control={control}
          label="Средний дневной заработок (₽)"
          isFormatted
          limit={11000000}
        />
      </View>

      <InfoModal
        visible={!!infoContent}
        title={infoContent?.title || ''}
        content={infoContent?.text || ''}
        onClose={() => setInfoContent(null)}
      />
    </View>
  )
}
