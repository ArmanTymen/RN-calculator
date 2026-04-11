import { SavingsCalculator } from '@/widgets/savings-calculator'
import { Text, View } from 'react-native'

export const SavingsPage = () => {
  return (
    <View className="mx-auto w-full max-w-md py-4">
      <Text className="mb-6 text-2xl font-bold text-slate-900">Калькулятор вкладов</Text>
      <SavingsCalculator />
    </View>
  )
}
