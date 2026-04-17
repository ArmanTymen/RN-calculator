import { PropertyTaxCalculator } from '@/widgets/calculators/property-tax-calculator'
import { Text, View } from 'react-native'

export const PropertyTaxDeductionPage = () => {
  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Имущественный вычет</Text>
      <PropertyTaxCalculator />
    </View>
  )
}
