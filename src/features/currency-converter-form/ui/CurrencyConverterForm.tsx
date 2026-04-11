// //src/features/converter-form/ui
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { ArrowLeftRight } from 'lucide-react-native'
import { ControlledNumberInput } from '@/shared/ui/controlled-number-input'
import { ControlledDateInput } from '@/shared/ui/controlled-data'
import { CurrencySelectField } from './CurrencySelectField'
import { useCurrencyConverter } from '../model/useCurrencyConverter'

export const CurrencyConverterForm = () => {
  const {
    result,
    control,
    handleSubmit,
    onCalculate,
    swapCurrencies,
    formValues,
    selectedDateQuery,
  } = useCurrencyConverter()

  return (
    <ScrollView className="flex-1 bg-slate-50 px-4 py-6">
      <View className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
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
              currentValue={formValues.sourceCurrency}
            />
          </View>

          <TouchableOpacity
            onPress={swapCurrencies}
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-slate-50"
          >
            <ArrowLeftRight size={24} color="#64748b" />
          </TouchableOpacity>

          <View className="flex-1">
            <CurrencySelectField
              name="targetCurrency"
              control={control}
              currentValue={formValues.targetCurrency}
            />
          </View>
        </View>

        <View className="mt-6">
          <ControlledDateInput name="rateDate" control={control} label="По курсу на дату" />
        </View>

        {result !== null && (
          <View className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <Text className="text-sm font-medium text-blue-600">Результат расчета:</Text>
            <Text className="text-2xl font-bold text-slate-900">
              {result.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}{' '}
              {formValues.targetCurrency}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleSubmit(onCalculate)}
          disabled={selectedDateQuery.isLoading}
          className={`mt-6 h-14 items-center justify-center rounded-xl shadow-md ${
            selectedDateQuery.isLoading ? 'bg-slate-300' : 'bg-blue-500 shadow-blue-200'
          }`}
        >
          {selectedDateQuery.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-lg font-bold text-white">РАССЧИТАТЬ</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
