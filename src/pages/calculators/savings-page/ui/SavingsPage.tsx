import { SavingsCalculator } from '@/widgets/calculators/savings-calculator'
import { Text, View } from 'react-native'

export const SavingsPage = () => {
  return (
    <View className="flex-1 bg-slate-50 p-4">
      <Text className="mb-6 text-2xl font-extrabold text-slate-900">Калькулятор вкладов</Text>
      <SavingsCalculator />
    </View>
  )
}
