import { CreditCalculator } from '@/widgets/calculators/credit-calculator'
import { Text, View } from 'react-native'

export const CreditPage = () => {
  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Калькулятор кредита</Text>
      <CreditCalculator />
    </View>
  )
}
