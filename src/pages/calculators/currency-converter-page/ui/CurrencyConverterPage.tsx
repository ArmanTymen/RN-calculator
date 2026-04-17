import { CurrencyConverterCalculator } from '@/widgets/calculators/currency-converter-calculator'
import { View, Text } from 'react-native'

export const ExchangePage = () => {
  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Конверетер валют</Text>
      <CurrencyConverterCalculator />
    </View>
  )
}
