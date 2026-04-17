import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native'
import { RotateCcw } from 'lucide-react-native'
import { useFormContext } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { CreditFormValues } from '@/entities/calculators/credit'
import { generateDateOptions } from '@/shared/lib'
import { BottomSheetModal } from '../../bottom-sheet-modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  maxMonths: number
}

export const RefinanceModal = ({ isOpen, onClose, maxMonths }: Props) => {
  const { setValue, getValues } = useFormContext<CreditFormValues>()

  const [localRate, setLocalRate] = useState<string>('0')
  const [localMonths, setLocalMonths] = useState<string>('0')
  const [localAtMonth, setLocalAtMonth] = useState<number>(1)

  const dateOptions = generateDateOptions(maxMonths || 120)
  const isFormValid = Number(localRate) > 0 && Number(localMonths) > 0

  useEffect(() => {
    if (isOpen) {
      const current = getValues('refinance')
      setLocalRate(String(current.newRate || ''))
      setLocalMonths(String(current.newMonths || ''))
      setLocalAtMonth(current.atMonth || 1)
    }
  }, [isOpen, getValues])

  const handleDone = (): void => {
    setValue('refinance', {
      enabled: true,
      newRate: Number(localRate),
      newMonths: Number(localMonths),
      atMonth: localAtMonth,
    })
    onClose()
  }

  const handleReset = (): void => {
    setValue('refinance', { enabled: false, newRate: 0, newMonths: 0, atMonth: 1 })
    onClose()
  }

  const headerRight = (
    <Pressable
      onPress={handleReset}
      className="h-10 w-10 items-center justify-center rounded-full bg-orange-50 active:bg-orange-100"
    >
      <RotateCcw color="#f97316" size={20} />
    </Pressable>
  )

  return (
    <BottomSheetModal
      isOpen={isOpen}
      onClose={onClose}
      title="Рефинансирование"
      headerRight={headerRight}
      enableKeyboardHandling={true}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6 pt-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-col gap-6 pb-10">
          <View className="flex-col gap-2">
            <Text className="text-sm font-semibold uppercase text-slate-500">Месяц начала</Text>
            <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Picker
                selectedValue={localAtMonth}
                onValueChange={(val: number) => setLocalAtMonth(val)}
              >
                {dateOptions.map((opt) => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex-row gap-4">
            <View className="flex-1 flex-col gap-2">
              <Text className="text-xs font-bold uppercase text-slate-400">Ставка (%)</Text>
              <TextInput
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-lg font-bold text-slate-900"
                keyboardType="numeric"
                value={localRate}
                onChangeText={setLocalRate}
                placeholder="0"
              />
            </View>
            <View className="flex-1 flex-col gap-2">
              <Text className="text-xs font-bold uppercase text-slate-400">Срок (мес)</Text>
              <TextInput
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-lg font-bold text-slate-900"
                keyboardType="numeric"
                value={localMonths}
                onChangeText={setLocalMonths}
                placeholder="0"
              />
            </View>
          </View>

          {!isFormValid && (
            <Text className="text-center text-xs italic text-slate-400">
              Введите ставку и срок, чтобы активировать расчет
            </Text>
          )}
        </View>
      </ScrollView>

      <View className="border-t border-slate-50 px-6 pb-4 pt-4">
        <Pressable
          onPress={handleDone}
          disabled={!isFormValid}
          className={`w-full items-center rounded-2xl py-4 ${
            isFormValid ? 'bg-blue-600 active:bg-blue-700' : 'bg-slate-200'
          }`}
        >
          <Text className={`text-base font-bold ${isFormValid ? 'text-white' : 'text-slate-400'}`}>
            Применить и рассчитать
          </Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  )
}
