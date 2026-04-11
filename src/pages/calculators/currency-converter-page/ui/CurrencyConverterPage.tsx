import { CurrencyConverterCalculator } from '@/widgets/currency-converter-calculator'
import { ScrollView, Text } from 'react-native'

export const ExchangePage = () => {
  return (
    <ScrollView className="mx-auto w-full max-w-md py-4">
      <Text className="mb-6 text-2xl font-bold text-slate-900">Конверетер валют</Text>
      <CurrencyConverterCalculator />
    </ScrollView>
  )
}
