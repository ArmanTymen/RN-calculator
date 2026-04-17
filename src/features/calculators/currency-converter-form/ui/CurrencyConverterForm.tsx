// src/features/currency-converter-form/ui/CurrencyConverterForm.tsx
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ArrowLeftRight } from 'lucide-react-native'
import { useFormContext, useWatch } from 'react-hook-form'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { ControlledDateInput } from '@/shared/ui/controlled-data'
import { CurrencySelectField } from './CurrencySelectField'
import { CurrencyConverterFormInput } from '@/entities/calculators/currency/model/schema'

interface Props {
  result: number | null
  swapCurrencies: () => void
  isLoading: boolean
}

export const CurrencyConverterForm = ({ result, swapCurrencies, isLoading }: Props) => {
  const { control } = useFormContext<CurrencyConverterFormInput>()

  const sourceCurrency = useWatch({ control, name: 'sourceCurrency' })
  const targetCurrency = useWatch({ control, name: 'targetCurrency' })

  return (
    <>
      <View className="flex-col gap-4">
        <ControlledNumberInput
          name="amount"
          label="Сумма"
          control={control}
          limit={5000000000}
          isFormatted
        />

        <Text className="mb-2 mt-4 text-center text-sm font-medium text-slate-500">
          Направление перевода
        </Text>

        <View className="flex-row items-stretch justify-between gap-2">
          <View className="flex-1">
            <CurrencySelectField
              name="sourceCurrency"
              control={control}
              currentValue={sourceCurrency}
            />
          </View>

          <TouchableOpacity
            onPress={swapCurrencies}
            className="mt-1 h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50"
          >
            <ArrowLeftRight size={20} color="#64748b" />
          </TouchableOpacity>

          <View className="flex-1">
            <CurrencySelectField
              name="targetCurrency"
              control={control}
              currentValue={targetCurrency}
            />
          </View>
        </View>

        <View className="mt-6">
          <ControlledDateInput name="rateDate" control={control} label="По курсу на дату" />
        </View>

        {isLoading ? (
          <View className="mt-6 items-center justify-center py-4">
            <ActivityIndicator color="#3b82f6" />
          </View>
        ) : result !== null ? (
          <View className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <Text className="text-sm font-medium text-blue-600">Результат расчета:</Text>
            <Text className="text-2xl font-bold text-slate-900">
              {result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} {targetCurrency}
            </Text>
          </View>
        ) : null}
      </View>
    </>
  )
}
