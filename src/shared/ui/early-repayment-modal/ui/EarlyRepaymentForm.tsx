import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { Picker } from '@react-native-picker/picker'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input/ui/ControlledNumberInput'
import type { EarlyRepaymentStrategy } from '@/entities/calculators/credit/model/types'
import { generateDateOptions } from '@/shared/lib/format-date/format-date'
import { useState } from 'react'
import { EarlyRepayment } from '@/entities/calculators/credit'

interface EarlyRepaymentFormProps {
  onSubmit: (data: Omit<EarlyRepayment, 'id'>) => void
  maxMonths: number
}

interface FormFields {
  amount: number
  month: number
  strategy: EarlyRepaymentStrategy
}

export const EarlyRepaymentForm = ({ onSubmit, maxMonths }: EarlyRepaymentFormProps) => {
  const [isCalculating, setIsCalculating] = useState<boolean>(false)

  const { control, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      amount: 0,
      month: 1,
      strategy: 'reduce_term',
    },
  })
  const currentAmount = useWatch({ control, name: 'amount' })

  const isDisabled = isCalculating || !currentAmount || Number(currentAmount) <= 0
  const dateOptions = generateDateOptions(maxMonths || 120)

  // 2. Оборачиваем логику сабмита с использованием таймера
  const handleLocalSubmit = (data: FormFields) => {
    setIsCalculating(true)
    setTimeout(() => {
      onSubmit({
        amount: Number(data.amount),
        month: Number(data.month),
        strategy: data.strategy,
      })
      reset()
      setIsCalculating(false)
    }, 50)
  }

  return (
    <View className="flex-col gap-4 p-4">
      <Text className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Новое досрочное погашение
      </Text>

      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="amount"
          control={control}
          label="Сумма досрочного платежа (₽)"
          limit={100000000}
          isFormatted={true}
        />

        <View className="flex-row gap-4">
          <View className="flex-1 flex-col gap-2">
            <Text className="text-sm font-medium text-slate-700">Когда внести</Text>
            <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Controller
                control={control}
                name="month"
                render={({ field: { onChange, value } }) => (
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(Number(itemValue))}
                  >
                    {dateOptions.map((opt) => (
                      <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                  </Picker>
                )}
              />
            </View>
          </View>

          <View className="flex-1 flex-col gap-2">
            <Text className="text-sm font-medium text-slate-700">Что сокращаем</Text>
            <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Controller
                control={control}
                name="strategy"
                render={({ field: { onChange, value } }) => (
                  <Picker selectedValue={value} onValueChange={(itemValue) => onChange(itemValue)}>
                    <Picker.Item label="Срок" value="reduce_term" />
                    <Picker.Item label="Платеж" value="reduce_payment" />
                  </Picker>
                )}
              />
            </View>
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleSubmit(handleLocalSubmit)}
        disabled={isDisabled}
        className={`mt-2 w-full flex-row items-center justify-center rounded-2xl py-4 active:scale-95 ${
          isDisabled ? 'bg-slate-300' : 'bg-blue-600 active:bg-blue-700'
        }`}
      >
        {isCalculating ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text className={`font-bold ${isDisabled ? 'text-slate-500' : 'text-white'}`}>
            Добавить в расчет
          </Text>
        )}
      </Pressable>
    </View>
  )
}
